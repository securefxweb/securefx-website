"use client";
import React, { useRef } from "react";
import styles from "./chooseWhere.module.scss";
import { motion, useInView } from "framer-motion";

const gridItems = [
	{
		title: "Economic Calendar",
		description:
			"Explore flexible partnership programs with competitive commissions and dedicated support, designed for influencers, educators, and industry professionals.",
		icon: "/assets/icons/Calendar.svg",
		link: "/calendar",
	},
	{
		title: "Partner",
		description:
			"Discover flexible account types designed for all trading styles, offering competitive spreads, fast execution, and reliable performance.",
		icon: "/assets/icons/Calendar.svg",
		link: "/ib",
	},
	{
		title: "Products",
		description: `Access flexible account types designed for all trading styles, offering competitive spreads, fast
execution, and reliable performance.
`,
		icon: "/assets/icons/Calendar.svg",
		link: "/forex",
	},
];

export default function ChooseWhere() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-150px" });

	const fadeUp = {
		hidden: { opacity: 0, y: 50 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.7, ease: "easeOut" },
		},
	};

	const staggerContainer = {
		show: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<div className={styles.chooseWhere} ref={ref}>
			<div className="container">
				<motion.div
					className={styles.title}
					variants={fadeUp}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<h2>Choose Where To Go Next</h2>
				</motion.div>
			</div>

			<motion.div
				className={styles.grid}
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "show" : "hidden"}
			>
				{gridItems.map((item, index) => (
					<motion.div
						key={index}
						variants={fadeUp}
						whileHover={{ scale: 1.05, translateY: -5 }}
						transition={{ duration: 0.3 }}
						className={styles.griditems}
					>
						<div>
							<div className={styles.icon}>
								<img src={item.icon} alt={item.title} />
							</div>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</div>
						<a style={{ textDecoration: "none" }} href={item.link}>
							Know more...
						</a>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
