import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./input.module.scss";

export default function Input({
	label,
	placeholder,
	value,
	onChange,
	type = "text",
	error,
	...props
}) {
	const [showPassword, setShowPassword] = useState(false);
	const isPasswordField = type === "password";

	return (
		<div className={styles.input}>
			{label && <label>{label}</label>}
			<div className={styles.inputRelative}>
				<input
					type={isPasswordField && showPassword ? "text" : type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					{...props}
				/>
				{isPasswordField && (
					<button
						type="button"
						className={styles.eyeIcon}
						onClick={() => setShowPassword(!showPassword)}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? (
							<EyeOff size={20} color="#9B9B9B" />
						) : (
							<Eye size={20} color="#9B9B9B" />
						)}
					</button>
				)}
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}
