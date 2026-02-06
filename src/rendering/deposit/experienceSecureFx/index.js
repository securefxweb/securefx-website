"use client";
import React from "react";
import styles from "./experienceSecureFx.module.scss";
import Button from "@/components/button";
import { motion } from "framer-motion";
import Link from "next/link";

const ChartImage = "/assets/images/chart.png";

const textVariants = {
	hidden: { opacity: 0, x: -40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.7, ease: "easeOut" },
	},
};

const imageVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

export default function ExperienceSecureFx() {
	return (
		<div className={styles.experienceSecureFx}>
			<div className="container-lg">
				<div className={styles.grid}>
					<motion.div
						className={styles.griditems}
						variants={textVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						<h2>Experience SecureFx Before Going Live</h2>
						<p>
							Use our demo account to familiarise yourself with trading
							conditions, platforms and funding tools-at zero risk.
						</p>
						<div className={styles.buttonAlignment}>
							<Link href="/ib">
								<Button text="Become an IB" />
							</Link>
						</div>
						<div className={styles.mobileShow}>
							<Link href="/ib">
								<Button text="Become an IB" className={styles.buttonwidth} />
							</Link>
						</div>
					</motion.div>

					<motion.div
						className={styles.griditems}
						variants={imageVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						animate={{
							y: [0, -10, 0], // floating animation
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatType: "loop",
						}}
					>
						<div className={styles.image}>
							<img src={ChartImage} alt="ChartImage" />
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
