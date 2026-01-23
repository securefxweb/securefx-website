"use client";
import React from "react";
import styles from "./aboutSecureFx.module.scss";
import { motion } from "framer-motion";

export default function AboutSecureFx() {
	const container = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut",
				staggerChildren: 0.25,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	return (
		<motion.div
			className={styles.aboutSecureFx}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			<div className="container-md4" id="about-secure-fx">
				<motion.h2 variants={item}>About Secure Fx</motion.h2>

				<motion.p variants={item}>
					SecureFx is a globally trusted forex broker committed to providing
					traders with a secure, transparent, and high-performance trading
					environment. With a strong regulatory framework and advanced trading
					technology, we empower individuals and institutions to trade
					confidently across global markets.
				</motion.p>

				<motion.p className={styles.sec} variants={item}>
					Driven by innovation, we offer competitive spreads, seamless
					execution, and access to multiple asset classes, all through intuitive
					platforms designed for speed and precision.
				</motion.p>

				<motion.p variants={item}>
					At SecureFx, integrity is at the core of everything we do. Our
					clients’ funds are safeguarded under strict compliance standards,
					supported by dedicated professionals who ensure smooth trading every
					step of the way.
				</motion.p>
			</div>
		</motion.div>
	);
}
