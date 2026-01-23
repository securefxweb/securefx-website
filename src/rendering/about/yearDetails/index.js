"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./yearDetails.module.scss";

const ArrowIcon = "/assets/icons/left-arrow.svg";

export default function YearDetails({ data }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hoverIndex, setHoverIndex] = useState(null);

	const tooltipVariants = {
		initial: { opacity: 0, y: 10, scale: 0.8 },
		animate: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: 10, scale: 0.8 },
	};

	const textVariants = {
		initial: { opacity: 0, y: 15 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -15 },
	};

	const handleArrow = (direction) => {
		if (direction === "left" && activeIndex > 0)
			setActiveIndex(activeIndex - 1);
		if (direction === "right" && activeIndex < data.length - 1)
			setActiveIndex(activeIndex + 1);
		setHoverIndex(null); // keep tooltip for active item
	};

	return (
		<div className={styles.yearDetailsAlignment} id="milesstone">
			<div className="container-md3">
				{/* Animated Top Text */}
				<div className={styles.contentAlignment}>
					<div className={styles.left}>
						<span>Year</span>
						<AnimatePresence mode="wait">
							<motion.h4
								key={data[activeIndex].year}
								variants={textVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.35 }}
							>
								{data[activeIndex].year}
							</motion.h4>
						</AnimatePresence>
					</div>

					<div className={styles.right}>
						<p>Achievement</p>
						<AnimatePresence mode="wait">
							<motion.span
								key={data[activeIndex].description}
								variants={textVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.35 }}
							>
								{data[activeIndex].description}
							</motion.span>
						</AnimatePresence>
					</div>
				</div>

				{/* Timeline */}
				<div className={styles.borderBox}>
					<div className={styles.leftArrow} onClick={() => handleArrow("left")}>
						<img src={ArrowIcon} alt="ArrowIcon" />
					</div>

					<div className={styles.lineAlignment}>
						{data.map((item, index) => (
							<div className={styles.lineWrapper} key={index}>
								{/* Tooltip only for activeIndex */}
								<AnimatePresence>
									{activeIndex === index && (
										<motion.div
											className={styles.tooltip}
											key={`tooltip-${index}`}
											variants={tooltipVariants}
											initial="initial"
											animate="animate"
											exit="exit"
											transition={{ duration: 0.25 }}
										>
											{item.year}
											<span className={styles.tooltipArrow}></span>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Line with hover enlarge but text change only on click */}
								<motion.div
									className={styles.line}
									onMouseEnter={() => setHoverIndex(index)}
									onMouseLeave={() => setHoverIndex(null)}
									onClick={() => setActiveIndex(index)}
									animate={{
										height:
											activeIndex === index
												? 46
												: hoverIndex === index
													? 38
													: 32,
										background:
											activeIndex === index
												? "#F35A2E"
												: "rgba(217, 217, 217, .1)",
									}}
									transition={{ duration: 0.3 }}
								/>
							</div>
						))}
					</div>

					<div
						className={styles.rightArrow}
						onClick={() => handleArrow("right")}
					>
						<img src={ArrowIcon} alt="ArrowIcon" />
					</div>
				</div>
			</div>
		</div>
	);
}
