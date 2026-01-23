"use client";
import styles from "./contactUsBanner.module.scss";
import Button from "@/components/button";
import { motion } from "framer-motion";

const ClockImage = "/assets/images/clock.png";
export default function ContactUsBanner() {
	return (
		<motion.div
			className={styles.preciseCalculationsBanner}
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="container-lg">
				<div className={styles.box}>
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
								<button className={styles.btnborder}>We’re Listening</button>
							</motion.div>

							<h1>How Can We Help You Today?</h1>
							<p>
								Share your question, feedback, or idea—we’ll make sure the right
								expert gets back to you fast.
							</p>
							<Button text="Get in Touch" className={styles.mobileHide} />
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
							<img src={ClockImage} alt="ClockImage" />
						</motion.div>
						<Button text="Get in Touch" className={styles.mobileShow} />
					</div>
				</div>
			</div>
		</motion.div>
	);
}
