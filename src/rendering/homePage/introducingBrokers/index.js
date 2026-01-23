"use client";
import React, { useRef } from "react";
import styles from "./introducingBrokers.module.scss";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
const BrokerImage = "/assets/images/broker.png";

export default function IntroducingBrokers() {
	const ref = useRef(null);
	const router = useRouter();
	const isInView = useInView(ref, { once: true, margin: "-150px" });

	const fadeUp = {
		hidden: { opacity: 0, y: 60 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};

	const fadeScale = {
		hidden: { opacity: 0, scale: 0.8 },
		show: {
			opacity: 1,
			scale: 1,
			transition: { duration: 1, ease: "easeOut", delay: 0.25 },
		},
	};
	const navigateToIB = () => {
		router.push("/ib");
	};
	return (
		<div className={styles.introducingBrokers} ref={ref} id="partner">
			<div className="container-lg">
				<div className={styles.grid}>
					<motion.div
						className={styles.text}
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						<h2>Introducing Brokers & Institutional Network</h2>
						<p>
							Join SecureFx’s global network of Introducing Brokers and
							institutional partners. Earn top-tier commissions, build
							sustainable growth, and access advanced trading infrastructure
							designed for professional scalability, including Affiliate, White
							Label, and Prime of Prime solutions.
						</p>

						<motion.div
							className={styles.buttonUi}
							variants={fadeUp}
							initial="hidden"
							animate={isInView ? "show" : "hidden"}
							transition={{ delay: 0.3 }}
							onClick={navigateToIB}
						>
							<div className={styles.layer}></div>
							<div className={styles.layer2}></div>
							<span>Become an IB</span>
						</motion.div>
					</motion.div>

					<motion.div
						className={styles.image}
						variants={fadeScale}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						<img src={BrokerImage} alt="BrokerImage" />
					</motion.div>
				</div>
			</div>
		</div>
	);
}
