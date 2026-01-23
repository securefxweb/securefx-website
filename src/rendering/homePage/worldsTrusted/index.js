"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./worldsTrusted.module.scss";
import WorldsTrustedForm from "../worldsTrustedForm";

export default function WorldsTrusted({formData}) {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

	const [showSecondLine, setShowSecondLine] = useState(false);

	useEffect(() => {
		if (isInView) {
			const timer = setTimeout(() => {
				setShowSecondLine(true);
			}, 2500); // 2.5 seconds delay
			return () => clearTimeout(timer);
		}
	}, [isInView]);

	return (
		<div className={styles.worldsTrusted} ref={sectionRef}>
			<div className="container">
				<div className={styles.title}>
					{/* First line */}
					{!showSecondLine && (
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.8 }}
						>
							World’s <span>#1</span> Trusted <span>Broker</span>
						</motion.h2>
					)}

					{/* Second line */}
					{showSecondLine && (
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							Open a <span>demo</span> Account
						</motion.h2>
					)}
				</div>

				<div className={styles.contnetAlignment}>
					<div>
						<h3>14,358+</h3>
						<p>Satisfied Traders Worldwide</p>
					</div>
					<div>
						<h3>397+</h3>
						<p>Industry Experts Onboard</p>
					</div>
					<div>
						<h3>15+</h3>
						<p>Years of Market Excellence</p>
					</div>
					<div>
						<h3>25,896+</h3>
						<p>Active Trading Accounts</p>
					</div>
				</div>
				<WorldsTrustedForm  form={formData} />
			</div>
		</div>
	);
}
