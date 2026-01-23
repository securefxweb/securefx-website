"use client";
import React from "react";
import styles from "./regulationsCountry.module.scss";
import { motion } from "framer-motion";

const EoneIcon = "/assets/icons/Eone.svg";
const ForeignIcon = "/assets/icons/Foreign.png";

export default function RegulationsCountry({ data }) {
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { staggerChildren: 0.25 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
	};

	const iconVariants = {
		hidden: { scale: 0.5, opacity: 0 },
		show: {
			scale: 1,
			opacity: 1,
			transition: { duration: 0.6, ease: "backOut" },
		},
	};

	return (
		<motion.div
			className={styles.regulationsCountry}
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.3 }}
		>
			<div className="container-lg2">
				<motion.div
					className={styles.allGridAlignment}
					variants={containerVariants}
				>
					{data.company.map((company, index) => (
						<motion.div
							key={index}
							className={styles.grid}
							variants={itemVariants}
						>
							<div>
								<motion.div className={styles.box} variants={iconVariants}>
									<img src={company.image} alt={company.name} />
								</motion.div>
							</div>
							<div>
								<h3>{company.name}</h3>
								{company.other.map((text, i) => (
									<p key={i}>{text}</p>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
}
