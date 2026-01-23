"use client";
import styles from "./calendarBanner.module.scss";
import Button from "@/components/button";
import { motion } from "framer-motion";

const CalendarImage = "/assets/images/Calendar.png";
export default function CalendarBanner() {
	return (
		<motion.div
			className={styles.calendarBanner}
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
								<button className={styles.btnborder}>Economic Calendar</button>
							</motion.div>

							<h1>Plan Your Trades -Economic Calendar.</h1>
							<p>
								Track key economic data releases in real-time with our
								interactive calendar, ensuring you have the latest information
								for informed and timely forex trading decisions.
							</p>
							<Button className={styles.mobileHide} text="Start Trading" />
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
							<img src={CalendarImage} alt="CalendarImage" />
						</motion.div>
						<Button className={styles.mobileShow} text="Start Trading" />
					</div>
				</div>
			</div>
		</motion.div>
	);
}
