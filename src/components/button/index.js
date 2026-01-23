"use client";
import React from "react";
import styles from "./button.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames";

export default function Button({ text, widthfull, className, onClick }) {
	return (
		<motion.div
			whileHover={{ scale: 1.01 }}
			transition={{ type: "spring", stiffness: 200 }}
			className={classNames(styles.buttonStyle)}
			onClick={onClick}
		>
			<div
				className={classNames(
					styles.buttonUi,
					widthfull && styles.widthfull,
					className,
				)}
			>
				<div className={styles.layer}></div>
				<div className={styles.layer2}></div>
				<span>{text}</span>
			</div>
		</motion.div>
	);
}
