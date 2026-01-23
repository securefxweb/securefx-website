"use client";
import React from "react";
import styles from "./secFundBanner.module.scss";
import { motion } from "framer-motion";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.25, delayChildren: 0.1 },
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

export default function SecFundBanner() {
	return (
		<motion.div
			className={styles.secFundBanner}
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
		>
			<div className="container-lg2">
				<motion.h1 variants={fadeUp}>
					Your Funds Security Is Our Strength Segregated Funds
				</motion.h1>

				<motion.div
					className={styles.lineAnimation}
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: "easeInOut" }}
					style={{ transformOrigin: "center" }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="727"
						height="1"
						viewBox="0 0 727 1"
						fill="none"
					>
						<path
							d="M0 0.5L727 0.499936"
							stroke="url(#paint0_linear_3610_619)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_3610_619"
								x1="4.37114e-08"
								y1="1"
								x2="727"
								y2="0.999936"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#F95C2F" stopOpacity="0" />
								<stop offset="0.471154" stopColor="#F95C2F" />
								<stop offset="1" stopColor="#F95C2F" stopOpacity="0" />
							</linearGradient>
						</defs>
					</svg>
				</motion.div>

				<motion.div className={styles.textstyle} variants={fadeUp}>
					<h2>Stored in independent accounts</h2>
					<p>
						Client funds are completely segregated from company capital and
						securely held in top-tier banking institutions.
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
}
