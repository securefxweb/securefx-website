"use client";
import Button from "@/components/button";
import { motion } from "framer-motion";
const AccountImage = "/assets/images/Regulations.png";
import styles from "./regulationsBanner.module.scss";
export default function RegulationsBanner({ data }) {
	return (
		<motion.div
			className={styles.rawAccountBanner}
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="container-lg">
				<div className={styles.box}>
					<motion.h2
						initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
						whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{data.heading}
					</motion.h2>
					<div className={styles.contentAlignment}>
						<motion.div
							className={styles.leftcontent}
							initial={{ opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, ease: "easeOut" }}
						>
							<motion.div
								className={styles.outlineButton}
								initial={{ scale: 0.9, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.1 }}
							>
								<button className={styles.btnborder}>{data.badge}</button>
							</motion.div>

							<h1>{data.title}</h1>

							<Button className={styles.mobileHide} text="Start Secure Trading" />
						</motion.div>

						<motion.div
							className={styles.image}
							initial={{ opacity: 0.8, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							animate={{ y: [0, -10, 0] }}
							transition={{
								duration: 4,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						>
							<img src={data.image} alt="Regulations" />
						</motion.div>
						<Button className={styles.mobileShow} text="Start Secure Trading" />

					</div>
				</div>
			</div>
		</motion.div>
	);
}
