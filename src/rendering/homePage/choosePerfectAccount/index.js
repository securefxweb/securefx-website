"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./choosePerfectAccount.module.scss";
import { perfectAccountData } from "@/constants/data";
import WinIcon from "@/icons/winIcon";
// Animation variants
const container = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.2 },
	},
};

const card = {
	hidden: { opacity: 0, scale: 0.9, y: 40 },
	show: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function ChoosePerfectAccount() {
	return (
		<div className={styles.choosePerfectAccount} id="accounts">
			<div className="container-lg">
				<div className={styles.title}>
					<h2>
						Choose Perfect <span>Account</span>
					</h2>
				</div>

				<motion.div
					className={styles.grid}
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-100px" }}
				>
					{perfectAccountData.accounts.map((item, index) => (
						<motion.div
							key={index}
							className={styles.griditems}
							variants={card}
						>
							<div className={styles.bestseller}>
								<WinIcon />
								<span>
									Best Seller
								</span>
							</div>
							<div className={styles.iconBox}>
								<img src={item.icon} alt="ProfileIcon" />
							</div>

							<div className={styles.details}>
								<h3>{item.title}</h3>
								<p>{item.desc}</p>

								<div className={styles.allListAlignment}>
									{item.features.map((feature, fIndex) => (
										<div key={fIndex} className={styles.list}>
											<div className={styles.round}></div>
											<div>
												<h4>{feature.label}</h4>
												<span>{feature.value}</span>
											</div>
										</div>
									))}
								</div>

								<Link href={item.link}>
									<div className={styles.buttonBottomAlignment}>
										<div className={styles.buttonUi}>
											<div className={styles.layer}></div>
											<div className={styles.layer2}></div>
											<span>Open Account</span>
										</div>
									</div>
								</Link>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
}
