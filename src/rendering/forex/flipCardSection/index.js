"use client";
import React, { useEffect, useState } from "react";
import styles from "./flipCardSection.module.scss";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
const ArrowIcon = "/assets/icons/arrow-black.svg";
import { currencyData } from "@/constants/data";
import { getForexPricing } from "@/services/forexapi";

export default function FlipCardSection() {
	const [forexData, setForexData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getForexPricing();
				console.log("forex data ====>", data);
				setForexData(data);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch forex data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	// Prepare currency cards data from API
	const getCurrencyCards = () => {
		if (loading || !forexData?.rates) {
			return currencyData; // Fallback to static data while loading
		}

		// Create cards for all currencies from API
		return Object.entries(forexData.rates).map(([currencyCode, rate]) => {
			// Find matching currency data for description
			const existingCurrency = currencyData.find((c) =>
				c.pair.includes(currencyCode),
			);

			return {
				pair: `USD/${currencyCode}`,
				description:
					existingCurrency?.description || `US Dollar vs ${currencyCode}`,
				rate: rate.toFixed(4),
				change_percent: existingCurrency?.change_percent || 0,
			};
		});
	};

	const displayData = getCurrencyCards();

	return (
		<div className={styles.flipCardSection}>
			<Marquee pauseOnHover autoFill>
				{displayData.map((currency, i) => {
					return (
						<motion.div
							key={`${currency.pair}-${i}`}
							className={`${styles.card} ${i % 2 === 1 ? styles.cardChange : ""
								}`}
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
									<span>{currency.change_percent}%</span>
									<p>{currency.description}</p>
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
