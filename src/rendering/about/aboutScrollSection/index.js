"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./aboutScrollSection.module.scss";
const OrnageLine = "/assets/images/orange-line.svg";

export default function AboutScrollSection({ data }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Transform scroll progress into discrete steps based on data length
	const steps = data.length - 1;
	const inputRange = Array.from({ length: steps + 1 }, (_, i) => i / steps);
	const outputRange = Array.from({ length: steps + 1 }, (_, i) =>
		Math.min(i, steps),
	);

	const progress = useTransform(scrollYProgress, inputRange, outputRange);

	useEffect(() => {
		return progress.on("change", (latest) => {
			const rounded = Math.round(latest);
			if (rounded !== currentIndex) {
				setCurrentIndex(rounded);
			}
		});
	}, [progress, currentIndex]);

	return (
		<div
			ref={containerRef}
			className={styles.scrollContainer}
			style={{ height: `${data.length * 100}vh` }}
		>
			<div className={styles.stickyContainer}>
				<div className={styles.contentWrapper}>
					<div className="container-lg">
						<div className={styles.grid}>
							{/* Image Section */}
							<div className={styles.imageSection}>
								{data.map((award, index) => {
									const totalItems = data.length;
									const prevItem = currentIndex - 1;
									const nextItem = currentIndex + 1;

									let opacity = 0;
									let x = 0;
									let y = 0;
									let rotate = 0;
									let scale = 0.8;
									let zIndex = 0;
									let cardClass = styles.adjacent;

									if (index === currentIndex) {
										x = 0;
										y = 0;
										opacity = 1;
										scale = 1;
										rotate = 0;
										zIndex = 100;
										cardClass = styles.current;
									} else if (index === prevItem && prevItem >= 0) {
										const radius = 360;
										const angle = Math.PI * 0.73;
										x = Math.cos(angle) * radius;
										y = -Math.sin(angle) * radius;
										opacity = 0.25;
										scale = 0.75;
										rotate = -30;
										zIndex = 50;
									} else if (index === nextItem && nextItem < totalItems) {
										const radius = 270;
										const angle = -Math.PI * 0.58;
										x = Math.cos(angle) * radius;
										y = -Math.sin(angle) * radius;
										opacity = 0.25;
										scale = 0.75;
										rotate = 15;
										zIndex = 50;
									} else {
										return null;
									}

									return (
										<motion.div
											key={award.id}
											className={`${styles.imageCard} ${cardClass}`}
											initial={false}
											animate={{
												x: `calc(-50% + ${x}px)`,
												y: `calc(-50% + ${y}px)`,
												scale: scale,
												opacity: opacity,
												rotate: rotate,
											}}
											transition={{
												duration: 0.6,
												ease: [0.4, 0, 0.2, 1],
											}}
											style={{ zIndex }}
										>
											<div className={styles.imageContent}>
												<img src={award.image} alt={award.image} />
												<div className={styles.awardLabel}>
													Award {award.number}
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>

							{/* Text Section */}
							<div className={styles.textSection}>
								{data.map((award, index) => {
									let opacity = 0;
									let translateY = 0;
									let visibility = "hidden";
									let pointerEvents = "none";

									const prevItem = currentIndex - 1;
									const nextItem = currentIndex + 1;

									if (index === currentIndex) {
										opacity = 1;
										translateY = 0;
										visibility = "visible";
										pointerEvents = "auto";
									} else if (index === nextItem && nextItem < data.length) {
										opacity = 0;
										translateY = 80;
										visibility = "visible";
									} else if (index === prevItem && prevItem >= 0) {
										opacity = 0;
										translateY = -80;
										visibility = "visible";
									}

									return (
										<motion.div
											key={award.id}
											className={styles.textCard}
											initial={false}
											animate={{
												y: `calc(-50% + ${translateY}px)`,
												opacity: opacity,
											}}
											transition={{
												duration: 0.6,
												ease: [0.4, 0, 0.2, 1],
											}}
											style={{
												visibility: visibility,
												pointerEvents: pointerEvents,
											}}
										>
											<div className={styles.textContent}>
												<h5 className={styles.number}>{award.number}</h5>
												<img src={OrnageLine} alt="OrnageLine" />

												<div className={styles.textDetails}>
													<h4>{award.title}</h4>
													<p>{award.description}</p>
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>
						</div>
					</div>
					{/* Awards Title */}
					<div className={styles.awardsTitle}>
						<h2>Awards.</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
