"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import styles from "./contactForm.module.scss";
import Dropdown from "@/components/dropdown";
import Input from "@/components/input";
import Button from "@/components/button";
import { saveContactForm } from "@/services/contactform";
import { toast } from "sonner";
import { submitContactForm } from "@/utils/emailService";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		prefix: "Mr.",
		fullname: "",
		email: "",
		message: "",
		countrycode: "+1",
		phonenumber: "",
		type: "contact-form",
	});
	const prefixItems = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
	const countryCodeItems = [
		"+1",
		"+44",
		"+91",
		"+86",
		"+49",
		"+33",
		"+81",
		"+61",
	];

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.prefix) newErrors.prefix = "Please select a prefix";
		if (!formData.fullname.trim()) newErrors.fullname = "Name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		}
		if (!formData.countrycode)
			newErrors.countrycode = "Please select country code";
		if (!formData.phonenumber.trim()) {
			newErrors.phonenumber = "Phone number is required";
		} else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phonenumber)) {
			newErrors.phonenumber = "Please enter a valid phone number";
		}

		return newErrors;
	};

	const handleSubmit = async () => {
		const validationErrors = validateForm();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			setLoading(true);
			try {
				await saveContactForm({
					name: formData.fullname,
					email: formData.email,
					mobile: `${formData.countrycode}${formData.phonenumber}`,
					country: formData.countrycode,
					message: formData.message,
				});

				// If Strapi success, then send email using utility function
				const emailResult = await submitContactForm({
					fullname: formData.fullname,
					email: formData.email,
					phonenumber: formData.phonenumber,
					message: formData.message,
					type: "contact-form",
				});

				toast.success("Form submitted successfully!");
				setFormData({
					prefix: "Mr.",
					fullname: "",
					email: "",
					message: "",
					countrycode: "+1",
					phonenumber: "",
					type: "contact-form",
				});
			} catch (error) {
				console.error("Form submission failed:", error);
				toast.error("Failed to save contact form");
			} finally {
				setLoading(false);
			}
		}
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	return (
		<div className={styles.contactFormAlignment}>
			<div className="container-md3">
				<div className={styles.title}>
					<h2>Globally licensed and compliant</h2>
					<div className={styles.lineCenter}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="469"
							height="1"
							viewBox="0 0 469 1"
							fill="none"
						>
							<path d="M0 0.5H469" stroke="url(#paint0_linear_3630_3560)" />
							<defs>
								<linearGradient
									id="paint0_linear_3630_3560"
									x1="0"
									y1="1"
									x2="469"
									y2="1"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#0084FF" />
									<stop offset="1" stopColor="#0084FF" stopOpacity="0" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<p>
						Operating with integrity across regulated jurisdictions to ensure
						every trade meets the highest level of investor protection.
					</p>
				</div>
				<div className={styles.box}>
					{/* <div>
            <Dropdown
              placeholder="Select Industry"
              roundefull
              items={industryItems}
              value={formData.industry}
              onChange={(value) => handleInputChange("industry", value)}
            />
            {errors.industry && (
              <div className={styles.error}>{errors.industry}</div>
            )}
          </div>*/}
					{/* Name and Phone Number */}
					<div className={styles.namePhoneRow}>
						<div className={styles.nameSection}>
							<div className={styles.prefixName}>
								<div>
									<Dropdown
										placeholder="Mr."
										label="Prefix"
										items={prefixItems}
										value={formData.prefix}
										onChange={(value) => handleInputChange("prefix", value)}
									/>
									{errors.prefix && (
										<div className={styles.error}>{errors.prefix}</div>
									)}
								</div>
								<div>
									<Input
										label="Your Name"
										placeholder="Ex. John Doe"
										value={formData.fullname}
										onChange={(e) =>
											handleInputChange("fullname", e.target.value)
										}
									/>
									{errors.fullname && (
										<div className={styles.error}>{errors.fullname}</div>
									)}
								</div>
							</div>
						</div>
						<div className={styles.phoneSection}>
							<label className={styles.label}>Phone Number</label>
							<div className={styles.phoneContainer}>
								<div className={styles.countryCodeWrapper}>
									<Dropdown
										placeholder="+1"
										items={countryCodeItems}
										value={formData.countrycode}
										onChange={(value) =>
											handleInputChange("countrycode", value)
										}
									/>
								</div>
								<div className={styles.phoneInputWrapper}>
									<Input
										placeholder="123 123 1234"
										value={formData.phonenumber}
										onChange={(e) =>
											handleInputChange("phonenumber", e.target.value)
										}
									/>
								</div>
							</div>
							{(errors.countrycode || errors.phonenumber) && (
								<div className={styles.error}>
									{errors.countrycode || errors.phonenumber}
								</div>
							)}
						</div>
					</div>

					{/* Mail */}
					<div className={styles.fieldRow}>
						<Input
							label="Email Address"
							placeholder="Enter your email..."
							type="email"
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
						/>
						{errors.email && <div className={styles.error}>{errors.email}</div>}
					</div>

					{/* Note */}
					<div className={styles.fieldRow}>
						<label className={styles.label}>Note</label>
						<textarea
							className={styles.textarea}
							placeholder="Enter your message..."
							value={formData.message}
							onChange={(e) => handleInputChange("message", e.target.value)}
							rows={4}
						/>
						{errors.message && (
							<div className={styles.error}>{errors.message}</div>
						)}
					</div>
					<div className={styles.buttonCenter}>
						<Button
							text={loading ? <Loader2 className={styles.loader} /> : "Submit"}
							onClick={handleSubmit}
							className={styles.buttonStyle}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
