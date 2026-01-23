"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./depositInSecond.module.scss";

const images = [
	"/assets/images/Mastercard.svg",
	"/assets/images/Stripe.svg",
	"/assets/images/Webmoney.svg",
	"/assets/images/Visa.svg",
	"/assets/images/PayPal.svg",
	"/assets/images/Payoneer.svg",
	"/assets/images/Bitpay.svg",
];

export default function DepositInSecond() {
	return (
		<div className={styles.depositInSecondAlignment}>
			<div className="container-lg">
				<div className={styles.title}>
					<h2>
						Deposit In Second. <br /> Withdrawals Without Wait.
					</h2>
				</div>

				<motion.div
					className={styles.imageAlignment}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={{
						visible: {
							transition: { staggerChildren: 0.2 },
						},
					}}
				>
					{images.map((src, i) => (
						<motion.img
							key={i}
							src={src}
							alt="brandLogo"
							variants={{
								hidden: { opacity: 0, scale: 0.8, y: 30 },
								visible: {
									opacity: 1,
									scale: 1,
									y: 0,
									transition: { duration: 0.6, ease: "easeOut" },
								},
							}}
							animate={{
								y: [0, -10, 0],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}
