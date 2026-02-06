"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./missionVissonSection.module.scss";

export default function MissionVissonSection({ data }) {
	const [currentSlide, setCurrentSlide] = useState(0);
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
			if (rounded !== currentSlide) {
				setCurrentSlide(rounded);
			}
		});
	}, [progress, currentSlide]);

	return (
		<div
			ref={containerRef}
			className={styles.scrollContainer}
			style={{ height: `${data.length * 100}vh` }}
			id="mission"
		>
			<div className={styles.stickyContainer}>
				<div className={styles.desktopSlider}>
					<div className={styles.sliderContainer}>
						<motion.div
							className={styles.sliderTrack}
							animate={{
								x: `-${currentSlide * 100}%`,
							}}
							transition={{
								duration: 0.6,
								ease: [0.4, 0, 0.2, 1],
							}}
						>
							{data.map((item, index) => (
								<div
									key={item.id}
									className={`${styles.slide} ${
										currentSlide === index ? styles.active : ""
									}`}
								>
									<div className={styles.iconCenter}>
										<img src={item.image} alt={item.title} />
									</div>
									<h2>{item.title}</h2>
									<p>{item.description}</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>

				<div className={styles.mobileShow}>
					{data.map((item) => (
						<div key={item.id}>
							<div className={styles.iconCenter}>
								<img src={item.image} alt={item.title} />
							</div>
							<h2>{item.title}</h2>
							<p>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
