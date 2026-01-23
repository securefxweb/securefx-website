import React, { useState } from "react";
import classNames from "classnames";
import styles from "../demoAccountForm/demoAccountForm.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { contactForm } from "@/services/contactform";
import { submitLiveAccountForm } from "@/utils/emailService";

export default function LiveAccountForm() {
	const [formData, setFormData] = useState({
		prefix: "Mr.",
		name: "",
		email: "",
		telephone: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const prefixItems = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;

		if (!formData.name.trim()) newErrors.name = "Name is required";

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (formData.email.trim() && !emailRegex.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!formData.telephone.trim()) {
			newErrors.telephone = "Telephone is required";
		} else if (
			formData.telephone.trim() &&
			!phoneRegex.test(formData.telephone)
		) {
			newErrors.telephone = "Invalid phone format";
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
		} else if (formData.password.trim() && formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = "Confirm password is required";
		} else if (
			formData.confirmPassword.trim() &&
			formData.password !== formData.confirmPassword
		) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		try {
			const strapiObject = {
				prefix: formData.prefix,
				fullname: formData.name,
				email: formData.email,
				password: formData.password,
				countrycode: "",
				phonenumber: formData.telephone,
				industry: "",
				type: "open_live_account",
			};

			const result = await contactForm.saveContactForm(strapiObject);
			const result2 = await submitLiveAccountForm(formData);

			toast.success("Live account request submitted successfully!");
			setFormData({
				prefix: "Mr.",
				name: "",
				email: "",
				telephone: "",
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			toast.error("Error submitting form. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={styles.demoAccountForm} onSubmit={handleSubmit}>
			<div className={styles.spacer}>
				<Dropdown
					placeholder="Mr."
					label="Prefix"
					items={prefixItems}
					value={formData.prefix}
					onChange={(value) => handleInputChange("prefix", value)}
				/>
			</div>
			<div className={styles.spacer}>
				<Input
					label="Your Name"
					placeholder="Ex. John Doe"
					value={formData.name}
					onChange={(e) => handleInputChange("name", e.target.value)}
					error={errors.name}
				/>
			</div>
			<div className={styles.spacer}>
				<Input
					label="Email Address"
					placeholder="Enter your email..."
					type="email"
					value={formData.email}
					onChange={(e) => handleInputChange("email", e.target.value)}
					error={errors.email}
				/>
			</div>
			<div className={styles.spacer}>
				<Input
					label="Telephone no."
					placeholder="123 123 1234"
					type="tel"
					value={formData.telephone}
					onChange={(e) => handleInputChange("telephone", e.target.value)}
					error={errors.telephone}
				/>
			</div>
			<div className={classNames(styles.spacer)}>
				<Input
					label="Password"
					placeholder="Enter your password"
					type="password"
					value={formData.password}
					onChange={(e) => handleInputChange("password", e.target.value)}
					error={errors.password}
				/>
			</div>
			<div className={classNames(styles.spacer)}>
				<Input
					label="Confirm Password"
					placeholder="Confirm your password"
					type="password"
					value={formData.confirmPassword}
					onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
					error={errors.confirmPassword}
				/>
			</div>
			<div className={styles.submitButton}>
				<button type="submit" className={styles.buttonUi} disabled={loading}>
					{/* gradient glow layers */}
					<span className={styles.layer}></span>
					<span className={styles.layer2}></span>

					{/* button text */}
					<span>
						{loading ? (
							<Loader2 className={styles.loader} />
						) : (
							"Open Live Account"
						)}
					</span>
				</button>
			</div>
		</form>
	);
}
