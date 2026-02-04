"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./seamlessTradingSteps.module.scss";
import { stepperData } from "@/constants/data";

export default function SeamlessTradingSteps() {
	const [activeStep, setActiveStep] = useState(0);
	const [displayImage, setDisplayImage] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % stepperData.stepper.steps.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDisplayImage(activeStep);
		}, 4500);
		return () => clearTimeout(timer);
	}, [activeStep]);

	return (
		<div className={styles.seamlessTradingStepsAlignment}>
			<div className="container-lg">
				<div className={styles.box}>
					{/* LEFT SIDE */}
					<div className={styles.leftContentAlignment}>
						<div className={styles.title}>
							<h2>Seamless Trading in Four Simple Steps</h2>
						</div>

						<div className={styles.allstepAlignment}>
							{stepperData.stepper.steps.map((step, index) => (
								<div key={step.id} className={styles.grid}>
									<div className={styles.griditems}>
										<motion.div
											className={styles.round}
											animate={{
												borderColor:
													index <= activeStep ? "#F95C2F" : "#3C75FE",
											}}
											transition={{
												duration: activeStep === 0 && index > 0 ? 0.2 : 0.3,
												ease: "easeInOut",
												delay: activeStep === 0 && index > 0 ? 0 : 1.2,
											}}
										>
											<motion.div
												className={styles.fill}
												animate={{
													backgroundColor:
														index <= activeStep ? "#F95C2F" : "#3C75FE",
												}}
												transition={{
													duration: activeStep === 0 && index > 0 ? 0.2 : 0.3,
													ease: "easeInOut",
													delay: activeStep === 0 && index > 0 ? 0 : 1.2,
												}}
											></motion.div>
										</motion.div>

										{index < stepperData.stepper.steps.length - 1 && (
											<div
												style={{
													position: "absolute",
													left: "50%",
													transform: "translateX(-50%)",
													width: "2px",
													top: "30px",
													height: "100%",
													backgroundColor: "#FFF",
													opacity: 0.2,
												}}
											>
												<motion.div
													style={{
														width: "100%",
														height: "100%",
														backgroundColor: "#F95C2F",
														transformOrigin: "top",
													}}
													initial={{ scaleY: 0 }}
													animate={{
														scaleY: index < activeStep ? 1 : 0,
													}}
													transition={{
														duration:
															activeStep === 0 && index >= activeStep
																? 0.2
																: 1.2,
														ease: "easeInOut",
													}}
												/>
											</div>
										)}
									</div>

									<div className={styles.griditems}>
										<motion.div
											className={styles.detailsbox}
											animate={{
												scale: index === activeStep ? 1.05 : 1,
												marginLeft: "10px",
											}}
											transition={{
												duration: 0.3,
												ease: "easeInOut",
												delay: index === activeStep ? 1.2 : 0,
											}}
										>
											<div className={styles.round}>{step.step}</div>
											<p>{step.content}</p>
										</motion.div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* RIGHT SIDE IMAGES (CROSSFADE, NO BLINK) */}
					<div className={styles.imges}>
						<div className={styles.imagestyle}>
							<div className={styles.imageWrapper}>
								{stepperData.stepper.steps.map((step, index) => (
									<motion.img
										key={index}
										src={step.images}
										alt={`Step ${index + 1}`}
										className={styles.imageAbsolute}
										animate={{
											opacity: index === displayImage ? 1 : 0,
										}}
										transition={{
											duration: 1.2,
											ease: [0.25, 0.1, 0.25, 1],
										}}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
