"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styles from "./productSteps.module.scss";
const StepImage = "/assets/images/product-steps.png";
const images = [
	"/assets/policy1.jpg",
	"/assets/policy2.jpg",
	"/assets/policy3.jpg",
	"/assets/policy4.jpg",
];
export default function ProductSteps({ stapesData }) {
	const [rotate, setRotate] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e) => {
		const { left, top, width, height } =
			e.currentTarget.getBoundingClientRect();
		const x = (e.clientY - top - height / 2) / 15;
		const y = -(e.clientX - left - width / 2) / 15;
		setRotate({ x, y });
	};
	return (
		<div className={styles.productSteps}>
			<div className="container-lg3">
				<div className={styles.title}>
					<h2>Stapes</h2>
				</div>
				<div className={styles.allCardAlignment}>
					{stapesData?.stapes?.map((step, index) => {
						return (
							<div key={step.id} className={styles.termsboxmain}>
								<div className={styles.termsimageboxmain}>
									<div className={styles.termsimagebox}>
										<img src={step.images || StepImage} alt="Prod_image" />
									</div>
								</div>
								<div className={styles.termsbox}>
									<span>{step.title}</span>
									<h3>{step.content}</h3>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
