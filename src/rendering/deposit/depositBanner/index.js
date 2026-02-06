"use client";
import styles from "./depositBanner.module.scss";
import Button from "@/components/button";
import { motion } from "framer-motion";
const AccountImage = "/assets/images/pro-account.png";
const PrintImage = "/assets/images/print.png";
export default function DepositBanner() {
	return (
		<motion.div
			className={styles.depositBanner}
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
								<button className={styles.btnborder}>Instant Access</button>
							</motion.div>

							<h1>Deposit & Withdraw with Zero Hassle</h1>
							<p>
								Choose the method that suits you best, move money instantly and
								trade with confidence without waiting.
							</p>
							<Button text="Begin Now" className={styles.mobileHide} />
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
							<img src={PrintImage} alt="PrintImage" />
						</motion.div>
						<Button text="Begin Now" className={styles.mobileShow} />
					</div>
				</div>
			</div>
		</motion.div>
	);
}
