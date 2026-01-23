import React from "react";
import styles from "./transferFunds.module.scss";

const paymentMethods = [
	{ name: "Mastercard", src: "/assets/images/Mastercard.svg" },
	{ name: "Stripe", src: "/assets/images/Stripe.svg" },
	{ name: "Webmoney", src: "/assets/images/Webmoney.svg" },
	{ name: "Visa", src: "/assets/images/Visa.svg" },
	{ name: "PayPal", src: "/assets/images/PayPal.svg" },
	{ name: "Payoneer", src: "/assets/images/Payoneer.svg" },
	{ name: "Bitpay", src: "/assets/images/Bitpay.svg" },
];

export default function TransferFunds() {
	return (
		<div className={styles.transferFundsAlignment}>
			<div className="container-lg">
				<div className={styles.title}>
					<h2>Transfer Funds</h2>
				</div>
				<div className={styles.imageAlignment}>
					{paymentMethods.map((method) => (
						<img key={method.name} src={method.src} alt={method.name} />
					))}
				</div>
			</div>
		</div>
	);
}
