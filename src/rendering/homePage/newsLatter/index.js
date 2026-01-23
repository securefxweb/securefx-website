"use client";
import React, { useState, useRef } from "react";
import styles from "./newsLatter.module.scss";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { contactForm } from "@/services/contactform";
import { subscribeNewsletter } from "@/utils/emailService";
import { Loader2 } from "lucide-react";
export default function NewsLatter() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-150px" });

	const fadeUp = {
		hidden: { opacity: 0, y: 60 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};

	const handleSubmit = async () => {
		if (!email) return toast.error("Enter valid email");
		setLoading(true);
		try {
			// First save to Strapi
			await contactForm.newsLetter({ email, type: "news-letter" });

			// If Strapi success, then send email using utility function
			const emailResult = await subscribeNewsletter(email);

			if (emailResult.success) {
				toast.success("NewsLetter subscribed successfully!");
				setEmail("");
			} else {
				toast.error("Subscription saved but email failed to send");
			}
		} catch (error) {
			toast.error("Error processing subscription");
		}
		setLoading(false);
	};

	return (
		<div className={styles.newsLatter} ref={ref}>
			<div className="container-md">
				<motion.h2
					variants={fadeUp}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					News Latter
				</motion.h2>

				<motion.div
					className={styles.grid}
					variants={fadeUp}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					transition={{ delay: 0.2 }}
				>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email..."
					/>

					<motion.div
						className={styles.buttonUi}
						onClick={handleSubmit}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						<div className={styles.layer}></div>
						<div className={styles.layer2}></div>
						<span>
							{loading ? <Loader2 className={styles.loader} /> : "Send"}
						</span>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
