"use client";
import React from "react";
import styles from "./simplicitySection.module.scss";
import classNames from "classnames";
import { motion } from "framer-motion";

export default function SimplicitySection({ data }) {
	return (
		<motion.div
			className={styles.simplicitySection}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
		>
			<div className="container-md2">
				<div className={styles.grid}>
					{/* LEFT COLUMN */}
					<div className={styles.griditems}>
						{data.left.map((item, index) => {
							const isFirstOrLast =
								index === 0 || index === data.left.length - 1;
							const delay = 0.12 + index * 0.16;
							const roundDelay = delay + 0.06;

							return (
								<motion.div
									key={item.key}
									className={isFirstOrLast ? styles.leftFirst : ""}
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay, duration: 0.55, ease: "easeOut" }}
								>
									<div
										className={classNames(styles.textstyle, {
											[styles.spacingRemove]: index === data.left.length - 1,
										})}
									>
										<motion.div
											className={styles.round}
											initial={{ scale: 0.8, opacity: 0 }}
											whileInView={{ scale: 1, opacity: 1 }}
											viewport={{ once: true }}
											transition={{
												delay: roundDelay,
												type: "spring",
												stiffness: 300,
											}}
										>
											{item.number}
										</motion.div>
										<p
											dangerouslySetInnerHTML={{
												__html: item.content.replace(/\n/g, "<br />"),
											}}
										/>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* CENTER */}
					<motion.div
						className={styles.griditems}
						initial={{ opacity: 0, scale: 0.92 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.78, duration: 0.7, ease: "easeOut" }}
						animate={{ y: [0, -8, 0] }}
					>
						<div className={styles.roundedbox}>
							<div className={styles.layer}></div>
							<div className={styles.layer1}></div>
							<motion.div
								className={styles.text}
								initial={{ opacity: 0, y: 8 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.82, duration: 0.6 }}
								animate={{ y: [0, -8, 0] }}
							>
								<h2>{data.parent.center}</h2>
							</motion.div>
						</div>
					</motion.div>

					{/* RIGHT COLUMN */}
					<div className={styles.griditems}>
						{data.right.map((item, index) => {
							const isFirstOrLast =
								index === 0 || index === data.right.length - 1;
							const delay = 0.96 + index * 0.16;
							const roundDelay = delay + 0.06;

							return (
								<motion.div
									key={item.key}
									className={isFirstOrLast ? styles.first : styles.sec}
									initial={{ opacity: 0, x: 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay, duration: 0.55, ease: "easeOut" }}
								>
									<div
										className={classNames(styles.textstyle, {
											[styles.spacingRemove]: index === data.right.length - 1,
										})}
									>
										<motion.div
											className={styles.round}
											initial={{ scale: 0.8, opacity: 0 }}
											whileInView={{ scale: 1, opacity: 1 }}
											viewport={{ once: true }}
											transition={{
												delay: roundDelay,
												type: "spring",
												stiffness: 300,
											}}
										>
											{item.number}
										</motion.div>
										<p>{item.content}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
