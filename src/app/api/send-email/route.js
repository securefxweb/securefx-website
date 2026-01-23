import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
	CONTACT_ADMIN_TEMPLATE,
	CONTACT_THANK_YOU_TEMPLATE,
	DEMO_ACCOUNT_ADMIN_TEMPLATE,
	DEMO_ACCOUNT_USER_TEMPLATE,
	LIVE_ACCOUNT_ADMIN_TEMPLATE,
	NEWSLETTER_ADMIN_TEMPLATE,
	NEWSLETTER_TEMPLATE,
} from "./template";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

/* -------------------- VALIDATION -------------------- */
const requiredFields = {
	newsletter: ["email"],
	contact_form: ["fullname", "email", "phonenumber", "message"],
	try_demo_account: ["prefix", "fullname", "email", "phonenumber"],
	open_live_account: ["prefix", "fullname", "email", "password", "phonenumber"],
};

const validateFields = (type, data) => {
	const fields = requiredFields[type];
	if (!fields) return "Invalid form type";

	const missing = fields.filter((f) => !data?.[f]);
	if (missing.length) {
		return `Missing fields: ${missing.join(", ")}`;
	}
	return null;
};

/* -------------------- EMAIL TEMPLATES -------------------- */
const templates = {
	newsletter: ({ email }) => ({
		toUser: {
			subject: "Welcome to SecureFX Newsletter",
			html: NEWSLETTER_TEMPLATE({ userName: "Trader" }),
		},
		toAdmin: {
			subject: "New Newsletter Subscription",
			html: NEWSLETTER_ADMIN_TEMPLATE({ email }),
		},
	}),

	contact_form: ({ fullname, email, phonenumber, message }) => ({
		toUser: {
			subject: "Thank You for Contacting SecureFX",
			html: CONTACT_THANK_YOU_TEMPLATE({ userName: fullname }),
		},
		toAdmin: {
			subject: "New Contact Form Submission",
			html: CONTACT_ADMIN_TEMPLATE({
				fullName: fullname,
				email,
				phoneNumber: phonenumber,
				message,
			}),
		},
	}),

	try_demo_account: ({
		prefix,
		fullname,
		email,
		countrycode,
		phonenumber,
	}) => ({
		toUser: {
			subject: "Demo Account Request Received - SecureFX",
			html: DEMO_ACCOUNT_USER_TEMPLATE({ userName: fullname }),
		},
		toAdmin: {
			subject: "New Demo Account Request",
			html: DEMO_ACCOUNT_ADMIN_TEMPLATE({
				prefix,
				fullName: fullname,
				email,
				countryCode: countrycode,
				phoneNumber: phonenumber,
			}),
		},
	}),

	open_live_account: ({
		prefix,
		fullname,
		email,
		countrycode,
		phonenumber,
	}) => ({
		toUser: {
			subject: "Live Account Request Received - SecureFX",
			html: DEMO_ACCOUNT_USER_TEMPLATE({
				userName: fullname,
				companyName: "SecureFX",
			}), // Reusing demo template or create a separate one
		},
		toAdmin: {
			subject: "New Live Account Opening Request",
			html: LIVE_ACCOUNT_ADMIN_TEMPLATE({
				prefix,
				fullName: fullname,
				email,
				countryCode: countrycode,
				phoneNumber: phonenumber,
			}),
		},
	}),
};

/* -------------------- API HANDLER -------------------- */
export async function POST(request) {
	try {
		const { type, data } = await request.json();

		if (!type || !data) {
			return NextResponse.json(
				{ error: "Type and data are required" },
				{ status: 400 },
			);
		}

		const validationError = validateFields(type, data);
		if (validationError) {
			return NextResponse.json({ error: validationError }, { status: 400 });
		}

		const template = templates[type];
		const emailTemplates = template(data);

		// Send email to user (confirmation)
		if (emailTemplates.toUser) {
			await transporter.sendMail({
				from: `"SecureFX" <${process.env.EMAIL_USER}>`,
				to: data.email,
				subject: emailTemplates.toUser.subject,
				html: emailTemplates.toUser.html,
			});
		}

		// Send email to admin (notification)
		if (emailTemplates.toAdmin) {
			await transporter.sendMail({
				from: `"SecureFX" <${process.env.EMAIL_USER}>`,
				to: ADMIN_EMAIL,
				subject: emailTemplates.toAdmin.subject,
				html: emailTemplates.toAdmin.html,
			});
		}

		return NextResponse.json(
			{ message: "Form submitted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Mail Error:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 },
		);
	}
}
