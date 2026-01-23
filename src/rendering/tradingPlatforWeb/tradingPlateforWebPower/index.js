"use client";
import React from "react";
import styles from "./tradingPlateforWebPower.module.scss";
import { motion } from "framer-motion";

const TradeToolsImage = "/assets/images/Installs.png";
const ArrowWhite = "/assets/icons/arrow-white.svg";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.25,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 40 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
export default function TradingPlateforWebPower({ data }) {
	return (
		<motion.div
			className={styles.tradeSmarterAlignment}
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.4 }}
		>
			<div className="container-lg">
				<div className={styles.grid}>
					<motion.div variants={item} className={styles.gridItem}>
						<div className={styles.stickySection}>
							<div className={styles.text}>
								<h2>{data["web-features"].title}</h2>
								<p>{data["web-features"].description}</p>
							</div>

							{/* Infinite rotate image */}
							<motion.div
								className={styles.image}
								animate={{ rotate: 360 }}
								transition={{
									repeat: Infinity,
									duration: 6,
									ease: "linear",
								}}
							>
								<img src={TradeToolsImage} alt="TradeToolsImage" />
							</motion.div>
						</div>
					</motion.div>

					<div className={styles.gridItem}>
						{data["web-features"].features.map((feature, index) => (
							<motion.div key={index} variants={item} className={styles.box}>
								<div className={styles.topAlignment}>
									<h3>{feature.title}</h3>
									<p>{feature.description}</p>
								</div>
								<div className={styles.bottomAlignment}>
									<img src={feature.icon} alt="ArrowWhite" />
									<p>{feature.date}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
