"use client";
import React from "react";
import styles from "./accessGlobalMarkets.module.scss";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { currencyData } from "@/constants/data";
const ArrowIcon = "/assets/icons/arrow-black.svg";

export default function AccessGlobalMarkets({ data }) {
	return (
		<div className={styles.accessGlobalMarketsRelative}>
			<div className="container-lg">
				<div className={styles.text}>
					<h2>Access Global Markets On One App</h2>
					<p>
						Trade Forex, Indices, Commodities, Stocks, and Crypto CFDs, all from
						a single, seamless MT5 mobile interface. View real-time pricing,
						spreads, and market depth to make informed trading decisions.
					</p>
				</div>
			</div>
			<Marquee>
				{[...Array(12)].map((_, i) => {
					const currency = currencyData[i % currencyData.length];
					return (
						<motion.div
							key={i}
							className={`${styles.card} ${i % 2 === 1 ? styles.cardChange : ""}`}
							whileHover={{ rotateY: 180 }}
							transition={{ duration: 0.6, ease: "easeInOut" }}
						>
							{/* Front */}
							<div className={styles.front}>
								<div className={styles.top}>
									<p>{currency.pair}</p>
									<h4>${currency.rate}</h4>
								</div>
								<div className={styles.bottom}>
									<p>{currency.description}</p>
									<span>{currency.change_percent}%</span>
								</div>
							</div>

							{/* Back */}
							<div className={styles.back}>
								<div className={styles.layer}></div>
								<div className={styles.layer1}></div>
								<div className={styles.iconText}>
									<span>Start Trading</span>
									<img src={ArrowIcon} alt="ArrowIcon" />
								</div>
							</div>
						</motion.div>
					);
				})}
			</Marquee>
		</div>
	);
}
