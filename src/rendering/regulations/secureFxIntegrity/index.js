import React from "react";
import styles from "./secureFxIntegrity.module.scss";
import Button from "@/components/button";
const IntegrityIcon = "/assets/icons/integrity.svg";
export default function SecureFxIntegrity({ data }) {
	return (
		<div className={styles.secureFxIntegrity}>
			<div className="container-lg2">
				<div className={styles.iconCenter}>
					<img
						src={data?.integrity?.icon || IntegrityIcon}
						alt="IntegrityIcon"
					/>
				</div>
				<h2>
					{data?.integrity?.description ||
						"At SecureFx, integrity isn't just policy, it's the foundation of every trade we protect."}
				</h2>
				<div className={styles.buttonCenter}>
					<Button text="Start  Trading" />
				</div>
			</div>
		</div>
	);
}
