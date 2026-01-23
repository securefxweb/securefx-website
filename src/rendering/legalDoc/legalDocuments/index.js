"use client";
import React from "react";
import styles from "./legalDocuments.module.scss";
import { motion } from "framer-motion";

const Arrow = "/assets/icons/arrow-black.svg";
const DocumentImage = "/assets/images/document.webp";
export default function LegalDocuments({ data }) {
	const parentVariants = {
		initial: {},
		hover: {}, // only to trigger children
	};

	const imageVariants = {
		initial: { opacity: 0, scale: 0.9 },
		hover: { opacity: 1, scale: 1 },
	};

	const arrowVariants = {
		initial: { rotate: 0 },
		hover: { rotate: 45 },
	};

	return (
		<div className={styles.legalDocuments}>
			<div className="container-lg3">
				<div className={styles.title}>
					<h2>Legal Documents</h2>
				</div>

				<div className={styles.allBoxAlignment}>
					{data?.rules?.map((item) => (
						<motion.div
							key={item.id}
							className={styles.box}
							variants={parentVariants}
							initial="initial"
							whileHover="hover"
							transition={{ duration: 0.4 }}
							style={{ position: "relative" }}
						>
							<p>{item.title}</p>

							<motion.div
								className={styles.arrow}
								variants={arrowVariants}
								transition={{ type: "spring", stiffness: 250 }}
							>
								<img src={Arrow} alt="Arrow" />
							</motion.div>

							<div className={styles.imageAlignment}>
								<motion.div
									className={styles.mainImage}
									variants={imageVariants}
									transition={{ duration: 0.5, ease: "easeOut" }}
								>
									<img src={item.image} alt={item.title} />
								</motion.div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
