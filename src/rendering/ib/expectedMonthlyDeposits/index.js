"use client";
import React, { useEffect, useState } from "react";
import styles from "./expectedMonthlyDeposits.module.scss";
import { motion, useMotionValue, animate } from "framer-motion";

const LineChartImage = "/assets/images/line-chart.svg";
const MobileLineChartImage = "/assets/images/mobile-line.svg";

export default function ExpectedMonthlyDeposits() {
	const containerVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.08,
			},
		},
	};

	const fadeUp = {
		hidden: { opacity: 0, y: 8 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	};

	return (
		<motion.div
			className={styles.expectedMonthlyDeposits}
			initial="hidden"
			animate="show"
			variants={containerVariants}
		>
			<div className="container-lg2">
				<motion.div className={styles.title} variants={fadeUp}>
					<h2>Expected Monthly Deposits</h2>
				</motion.div>

				<motion.div className={styles.buttonCenter} variants={fadeUp}>
					<motion.div
						className={styles.buttonUi}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.99 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						<span>Above $50,000</span>
					</motion.div>

					<motion.div
						className={styles.buttonUi}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.99 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						<span>Below $50,000</span>
					</motion.div>
				</motion.div>

				<motion.div className={styles.boxCenter} variants={fadeUp}>
					{/* Left stat */}
					<motion.div variants={fadeUp}>
						<h4>10</h4>
						<p>Total Accumulated Clients</p>
					</motion.div>

					<motion.div variants={fadeUp}>
						<motion.img
							src={LineChartImage}
							alt="LineChartImage"
							style={{ width: "100%", height: "auto", maxWidth: 320 }}
							animate={{ y: [0, -10, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
							whileHover={{ scale: 1.02 }}
						/>
						<motion.img
							src={MobileLineChartImage}
							alt="MobileLineChartImage"
							style={{ width: "100%", height: "auto", maxWidth: 320 }}
							animate={{ y: [0, -10, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
							whileHover={{ scale: 1.02 }}
						/>
					</motion.div>

					{/* Right stat */}
					<motion.div className={styles.bottomAlignment} variants={fadeUp}>
						<div>
							<h4>$1320</h4>
							<p>Your income per month</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	);
}
