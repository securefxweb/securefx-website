import React, { useState } from "react";
import styles from "./affiliateForm.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { affiliateService } from "@/services/affiliate";

export default function AffiliateForm() {
	const [formData, setFormData] = useState({
		prefix: "Mr.",
		name: "",
		email: "",
		countrycode: "+1",
		telephone: "",
		socialMediaLink: "",
		message: "",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const prefixItems = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];
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

		if (!formData.countrycode) {
			newErrors.countrycode = "Please select country code";
		}

		if (!formData.telephone.trim()) {
			newErrors.telephone = "Telephone is required";
		} else if (
			formData.telephone.trim() &&
			!phoneRegex.test(formData.telephone)
		) {
			newErrors.telephone = "Invalid phone format";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
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
			const affiliateData = {
				prefix: formData.prefix,
				full_name: formData.name,
				email: formData.email,
				country_code: formData.countrycode,
				phonenumber: formData.telephone,
				social_media_link: formData.socialMediaLink,
				message: formData.message,
			};

			const response =
				await affiliateService.submitAffiliateForm(affiliateData);

			toast.success("Affiliate form submitted successfully!");

			// Reset form
			setFormData({
				prefix: "Mr.",
				name: "",
				email: "",
				countrycode: "+1",
				telephone: "",
				socialMediaLink: "",
				message: "",
			});
			setErrors({});
		} catch (error) {
			console.error("Error submitting affiliate form:", error);
			toast.error(
				error.response?.data?.error?.message ||
					"Error submitting form. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={styles.affiliateForm} onSubmit={handleSubmit}>
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
					placeholder="Ex. Jhone doe"
					value={formData.name}
					onChange={(e) => handleInputChange("name", e.target.value)}
					error={errors.name}
				/>
			</div>

			<div className={styles.spacer}>
				<Input
					label="Email Address"
					placeholder="Enter your email..."
					value={formData.email}
					onChange={(e) => handleInputChange("email", e.target.value)}
					error={errors.email}
				/>
			</div>

			<div className={styles.spacer}>
				<label
					style={{
						color: "#fff",
						fontSize: "14px",
						display: "block",
						marginBottom: "4px",
					}}
				>
					Telephone no.
				</label>
				<div style={{ display: "flex", gap: "8px" }}>
					<div style={{ width: "120px" }}>
						<Dropdown
							placeholder="+1"
							items={countryCodeItems}
							value={formData.countrycode}
							onChange={(value) => handleInputChange("countrycode", value)}
						/>
					</div>
					<div style={{ flex: 1 }}>
						<Input
							placeholder="123 123 1234"
							type="tel"
							value={formData.telephone}
							onChange={(e) => handleInputChange("telephone", e.target.value)}
						/>
					</div>
				</div>
				{(errors.countrycode || errors.telephone) && (
					<div style={{ color: "#ff4444", fontSize: "12px", marginTop: "4px" }}>
						{errors.countrycode || errors.telephone}
					</div>
				)}
			</div>

			<div className={styles.spacer}>
				<Input
					label="Social media link"
					placeholder="Paste here..."
					value={formData.socialMediaLink}
					onChange={(e) => handleInputChange("socialMediaLink", e.target.value)}
					error={errors.socialMediaLink}
				/>
			</div>

			<div className={styles.spacer}>
				<label
					style={{
						color: "#fff",
						fontSize: "14px",
						display: "block",
						marginBottom: "6px",
					}}
				>
					Message
				</label>
				<textarea
					className={styles.textarea}
					placeholder="Message..."
					value={formData.message}
					onChange={(e) => handleInputChange("message", e.target.value)}
					rows={1}
				/>
				{errors.message && (
					<div style={{ color: "#ff4444", fontSize: "12px", marginTop: "4px" }}>
						{errors.message}
					</div>
				)}
			</div>

			<div className={styles.submitButton}>
				<button type="submit" className={styles.buttonUi} disabled={loading}>
					{/* gradient glow layers */}
					<span className={styles.layer}></span>
					<span className={styles.layer2}></span>

					{/* button text */}
					<span>
						{loading ? <Loader2 className={styles.loader} /> : "Submit"}
					</span>
				</button>
			</div>
		</form>
	);
}
