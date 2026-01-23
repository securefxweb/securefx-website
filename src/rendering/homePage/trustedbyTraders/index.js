"use client";
import React, { useRef } from "react";
import styles from "./trustedbyTraders.module.scss";
import { motion, useInView } from "framer-motion";
import WorldMap from "@/components/worldMap";

const MapImage = "/assets/images/map.png";

export default function TrustedbyTraders() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-150px" });

	const fadeUp = {
		hidden: { opacity: 0, y: 60 },
		show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
	};

	const fadeScale = {
		hidden: { opacity: 0, scale: 0.8 },
		show: {
			opacity: 1,
			scale: 1,
			transition: { duration: 1, ease: "easeOut", delay: 0.2 },
		},
	};

	return (
		<div className={styles.trustedbyTraders} ref={ref}>
			<div className="container-lg">
				<motion.div
					className={styles.text}
					variants={fadeUp}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<h2>
						<span>Trusted</span> by <span> Traders </span> Worldwide
					</h2>
					<p>
						Secure FX serves a growing community of global traders across Asia,
						Africa, and Europe, offering reliable platforms, tight spreads, and
						24/5 multilingual support trusted by professionals and beginners
						alike.
					</p>
				</motion.div>

				<motion.div
					className={styles.centerImage}
					variants={fadeScale}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{/* <img src={MapImage} alt="MapImage" /> */}
					<WorldMap />
				</motion.div>
			</div>
		</div>
	);
}
