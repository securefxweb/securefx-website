"use client";
import React from "react";
import styles from "./aboutBanner.module.scss";
import { motion } from "framer-motion";

const Aboutshield = "/assets/images/aboutshield.png";
const AboutImage = "/assets/images/about.png";
const YearText = "/assets/images/year-text.svg";
const AccountText = "/assets/images/account.svg";
const TradersText = "/assets/images/traders.svg";
const MarketText = "/assets/images/market.svg";

export default function AboutBanner() {
	// Floating animation

	const floatAnim = {
		initial: { opacity: 0, y: 15, rotate: -5 },
		animate: {
			opacity: 1,
			y: 0,
			rotate: 0,
			transition: { duration: 1, ease: "easeOut" },
		},
		whileHover: { scale: 1.1, rotate: 3 },
	};

	const textContainer = {
		animate: {
			transition: {
				staggerChildren: 2,
			},
		},
	};

	// const textItem = {
	//   initial: {
	//     opacity: 0,
	//     bottom: '-25%',
	//     transform: 'translate(-50%, 0%)',
	//   },
	//   animate: {
	//     opacity: [0, 1, 1, 0],
	//     bottom: ['-25%', '50%', '50%', '100%'],
	//     transform: [
	//       'translate(-50%, 0%)',
	//       'translate(-50%, 50%)',
	//       'translate(-50%, 50%)',
	//       'translate(-50%, 100%)',
	//     ],
	//     transition: {
	//       duration: 2,
	//       times: [0, 0.3, 0.7, 1],
	//       ease: 'easeInOut',
	//       // repeat: Infinity,
	//       repeatDelay: 6,
	//     },
	//   },
	// }

	const textItem = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: [0, 1, 1, 0],
			transition: {
				duration: 2,
				times: [0, 0.3, 0.7, 1],
				ease: "easeInOut",
				repeat: Infinity,
				repeatDelay: 6,
			},
		},
	};

	return (
		<div className={styles.aboutBanner}>
			<div className="container-md4">
				<div className={styles.aboutBannerText}>
					<h1>The trusted broker behind every confident trade.</h1>
				</div>
				<div className={styles.relative}>
					<div className={styles.imageCenter}>
						<motion.img
							src={AboutImage}
							alt="About"
							className={styles.aboutImage}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 1, ease: "easeOut" }}
						/>
						<div className={styles.aboutshieldrelative}>
							<motion.img
								src={Aboutshield}
								alt="Shield"
								className={styles.aboutshield}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 1, ease: "easeOut" }}
							/>
							<motion.div
								variants={textContainer}
								initial="initial"
								animate="animate"
							>
								<motion.div
									className={styles.animatingtextfirst}
									variants={textItem}
								>
									<h2>15+ Years of Trust</h2>
								</motion.div>

								<motion.div
									className={styles.animatingtextsecond}
									variants={textItem}
								>
									<h2>14000+ Global Traders</h2>
								</motion.div>

								<motion.div
									className={styles.animatingtextthird}
									variants={textItem}
								>
									<h2>25K+ Active Accounts</h2>
								</motion.div>

								<motion.div
									className={styles.animatingtextfourth}
									variants={textItem}
								>
									<h2>390+ Market Experts</h2>
								</motion.div>
							</motion.div>
						</div>
					</div>

					<div className={styles.first}>
						<motion.img src={YearText} alt="Years" {...floatAnim} />
					</div>

					<div className={styles.sec}>
						<motion.img src={AccountText} alt="Accounts" {...floatAnim} />
					</div>

					<div className={styles.three}>
						<motion.img src={TradersText} alt="Traders" {...floatAnim} />
					</div>

					<div className={styles.four}>
						<motion.img src={MarketText} alt="Markets" {...floatAnim} />
					</div>
				</div>
			</div>
		</div>
	);
}
