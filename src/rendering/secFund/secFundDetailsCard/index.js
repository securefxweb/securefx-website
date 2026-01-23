"use client";
import React from "react";
import styles from "./secFundDetailsCard.module.scss";
import { motion } from "framer-motion";
import { secFundData } from "@/constants/data";

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.15 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 40, scale: 0.9 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

export default function SecFundDetailsCard() {
	return (
		<motion.div
			className={styles.secFundDetailsCard}
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
		>
			<div className="container-lg">
				<div className={styles.grid}>
					{secFundData.map((item) => (
						<motion.div
							key={item.id}
							className={styles.griditems}
							variants={cardVariants}
							whileHover={{
								scale: 1.05,
								rotateX: 5,
								rotateY: 3,
								transition: { duration: 0.3, ease: "easeOut" },
							}}
						>
							<div className={styles.iconAlignment}>
								<img src={item.icon} alt={item.title} />
							</div>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
