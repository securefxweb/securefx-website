"use client";
import React, { useState, useRef } from "react";
import styles from "./whySecureFx.module.scss";
import BlueDot from "@/icons/bluedot";
import { motion, useInView } from "framer-motion";

const ArrowIcon = "/assets/icons/left-arrow.svg";

export default function WhySecureFx({ data }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-150px" });

	const fadeUp = {
		hidden: { opacity: 0, y: 60, scale: 0.95 },
		show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
	};

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

	const getCardPosition = (index) => {
		let diff = index - currentIndex;

		if (diff > data.length / 2) diff -= data.length;
		if (diff < -data.length / 2) diff += data.length;

		if (diff === 0) {
			return {
				x: 0,
				y: 0,
				rotate: 0,
				scale: 1,
				opacity: 1,
				zIndex: 10,
			};
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
				<motion.div
					variants={fadeUp}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					className={styles.sectiontitle}
				>
					<h2>
						Why <span>Secure FX</span>
					</h2>
					<p>
						Empowering traders worldwide with innovative tools, secure fund
						management, and proven market expertise.
					</p>
				</motion.div>

				{/* SLIDER CENTERED */}
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

				{/* NAVIGATION */}
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
