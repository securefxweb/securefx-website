"use client";
import React from "react";
import styles from "./aboutBanner.module.scss";
import { motion } from "framer-motion";

const AboutImage = "/assets/images/about.png";
const YearText = "/assets/images/year-text.svg";
const AccountText = "/assets/images/account.svg";
const TradersText = "/assets/images/traders.svg";
const MarketText = "/assets/images/market.svg";

export default function AboutBanner() {
	// Floating animation
	const floatAnim = {
		initial: { opacity: 0, y: 15, rotate: -5 },
		animate: {
			opacity: 1,
			y: 0,
			rotate: 0,
			transition: {
				duration: 1,
				ease: "easeOut",
			},
		},
		whileHover: { scale: 1.1, rotate: 3 },
	};

	return (
		<div className={styles.aboutBanner}>
			<div className="container-md4">
				<div className={styles.relative}>
					<div className={styles.imageCenter}>
						<motion.img
							src={AboutImage}
							alt="AboutImage"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 1, ease: "easeOut" }}
						/>
					</div>

					<div className={styles.first}>
						<motion.img src={YearText} alt="YearText" {...floatAnim} />
					</div>

					<div className={styles.sec}>
						<motion.img src={AccountText} alt="AccountText" {...floatAnim} />
					</div>

					<div className={styles.three}>
						<motion.img src={TradersText} alt="TradersText" {...floatAnim} />
					</div>

					<div className={styles.four}>
						<motion.img src={MarketText} alt="MarketText" {...floatAnim} />
					</div>
				</div>
			</div>
		</div>
	);
}
