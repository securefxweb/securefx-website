import React from "react";
import styles from "./ibBanner.module.scss";
import Button from "@/components/button";
export default function IbBanner() {
	return (
		<div className={styles.ibbannerDesign}>
			<div className="container-lg2">
				<div className={styles.text}>
					<h1>Empower Your Earnings with SecureFX IB Program</h1>
					<p>
						Earn up to #% revenue share and join a global network of trusted
						partners.
					</p>
				</div>
			</div>
			<div className={styles.buttonAlignment}>
				<a href="https://client.securefx.net/login" target="_blank" >
					<Button text="Start Trading" />
				</a>
			</div>
		</div>
	);
}
