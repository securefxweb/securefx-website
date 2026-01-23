"use client";
import React, { useState, useRef } from "react";
import styles from "./faq.module.scss";
import classNames from "classnames";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { faqs } from "@/constants/data";

const PlusIcon = "/assets/icons/plus.svg";

export default function Faq() {
	const [activeIndex, setActiveIndex] = useState(null);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const toggleFAQ = (i) => {
		setActiveIndex(activeIndex === i ? null : i);
	};

	const fadeUp = {
		hidden: { opacity: 0, y: 60 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};

	const staggerContainer = {
		show: { transition: { staggerChildren: 0.15 } },
	};

	// SPLIT FAQs INTO LEFT + RIGHT COLUMN
	const mid = Math.ceil(faqs.length / 2);
	const leftFaqs = faqs.slice(0, mid);
	const rightFaqs = faqs.slice(mid);

	return (
		<div className={styles.faqSectionAlignment} ref={ref}>
			<div className="container-lg">
				<motion.div
					className={styles.title}
					variants={fadeUp}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<h2>FAQs</h2>
				</motion.div>

				<motion.div
					className={styles.grid}
					variants={staggerContainer}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{/* LEFT COLUMN */}
					<div className={styles.column}>
						{leftFaqs.map((item, i) => (
							<motion.div
								key={`faq-left-${i}`}
								variants={fadeUp}
								className={classNames(
									styles.mainFaq,
									activeIndex === i ? styles.activeFaq : "",
								)}
							>
								<div className={styles.faqHeader} onClick={() => toggleFAQ(i)}>
									<h3>{item.question}</h3>

									<motion.div
										animate={{ rotate: activeIndex === i ? 45 : 0 }}
										transition={{ duration: 0.3 }}
										className={styles.icon}
									>
										<img src={PlusIcon} alt="PlusIcon" />
									</motion.div>
								</div>

								<AnimatePresence>
									{activeIndex === i && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.4, ease: "easeInOut" }}
											className={styles.faqbody}
										>
											<div className={styles.spacing}>
												<p>{item.answer}</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</div>

					{/* RIGHT COLUMN */}
					<div className={styles.column}>
						{rightFaqs.map((item, i) => {
							const realIndex = i + mid; // adjust index for toggle

							return (
								<motion.div
									key={`faq-right-${i}`}
									variants={fadeUp}
									className={classNames(
										styles.mainFaq,
										activeIndex === realIndex ? styles.activeFaq : "",
									)}
								>
									<div
										className={styles.faqHeader}
										onClick={() => toggleFAQ(realIndex)}
									>
										<h3>{item.question}</h3>

										<motion.div
											animate={{
												rotate: activeIndex === realIndex ? 45 : 0,
											}}
											transition={{ duration: 0.3 }}
											className={styles.icon}
										>
											<img src={PlusIcon} alt="PlusIcon" />
										</motion.div>
									</div>

									<AnimatePresence>
										{activeIndex === realIndex && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.4, ease: "easeInOut" }}
												className={styles.faqbody}
											>
												<div className={styles.spacing}>
													<p>{item.answer}</p>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
