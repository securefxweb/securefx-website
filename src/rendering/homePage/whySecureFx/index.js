"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./whySecureFx.module.scss";
import BlueDot from "@/icons/bluedot";
import { motion, useInView, useAnimation } from "framer-motion";

const ArrowIcon = "/assets/icons/left-arrow.svg";
const AUTO_PLAY_DELAY = 5000;

export default function WhySecureFx({ data }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-150px" });

	const progressControls = useAnimation();
	const intervalRef = useRef(null);

	/* ------------------ PROGRESS ------------------ */
	const startProgress = () => {
		progressControls.stop();
		progressControls.set({ width: "0%" });
		progressControls.start({
			width: "100%",
			transition: { duration: 5, ease: "linear" },
		});
	};

	/* ------------------ AUTOPLAY ------------------ */
	const forceNext = () => {
		setCurrentIndex((prev) => (prev + 1) % data.length);
	};

	useEffect(() => {
		if (!isInView) return;

		startProgress();

		intervalRef.current = setInterval(() => {
			forceNext();
		}, AUTO_PLAY_DELAY);

		return () => {
			clearInterval(intervalRef.current);
		};
	}, [currentIndex, isInView]);

	/* ------------------ MANUAL CONTROLS ------------------ */
	const next = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => (prev + 1) % data.length);
		setTimeout(() => setIsTransitioning(false), 500);
	};

	const prev = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
		setTimeout(() => setIsTransitioning(false), 500);
	};

	/* ------------------ CARD POSITION ------------------ */
	const getCardPosition = (index) => {
		let diff = index - currentIndex;

		if (diff > data.length / 2) diff -= data.length;
		if (diff < -data.length / 2) diff += data.length;

		if (diff === 0) {
			return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 10 };
		}
		if (diff === -1) {
			return {
				x: -280,
				y: 45,
				rotate: -12,
				scale: 0.85,
				opacity: 0.6,
				zIndex: 5,
			};
		}
		if (diff === 1) {
			return {
				x: 280,
				y: 45,
				rotate: 12,
				scale: 0.85,
				opacity: 0.6,
				zIndex: 5,
			};
		}

		return {
			x: diff * 350,
			y: 120,
			rotate: diff * 8,
			scale: 0.6,
			opacity: 0,
			zIndex: 0,
		};
	};

	return (
		<div className={styles.whySecureFxSection} ref={ref}>
			<div className="container" id="why-secure-fx">
				<div className={styles.sectiontitle}>
					<h2>
						Why <span>Secure FX</span>
					</h2>
					<p>
						Empowering traders worldwide with innovative tools, secure fund
						management, and proven market expertise.
					</p>
				</div>

				<div className={styles.centerBox}>
					<div className={styles.sliderWrap}>
						{data.map((card, index) => (
							<motion.div
								key={index}
								className={styles.cardStyle}
								animate={getCardPosition(index)}
								transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
								style={{ "--gradient-color": card.color }}
								onClick={() => !isTransitioning && setCurrentIndex(index)}
							>
								{/* PROGRESS */}
								<div className={styles.topline}>
									{index === currentIndex && (
										<motion.span
											className={styles.progress}
											animate={progressControls}
										/>
									)}
								</div>

								<div className={styles.sapcing}>
									<div className={styles.cardheader}>
										<BlueDot color={card.color.slice(0, 7)} />
										<span>{card.title}</span>
									</div>
									<h3>{card.subtitle}</h3>
									<p>{card.description}</p>
								</div>

								<div className={styles.imageRightAlignment}>
									<img src={card.image} alt={card.title} />
								</div>
							</motion.div>
						))}
					</div>
				</div>

				<div className={styles.arrowCenterAlignment}>
					<button onClick={prev}>
						<img src={ArrowIcon} alt="Previous" />
					</button>
					<button onClick={next} style={{ transform: "rotate(180deg)" }}>
						<img src={ArrowIcon} alt="Next" />
					</button>
				</div>
			</div>
		</div>
	);
}
