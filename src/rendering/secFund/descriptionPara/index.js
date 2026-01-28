"use client";
import React from "react";
import styles from "./descriptionPara.module.scss";
import { motion } from "framer-motion";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function DescriptionPara() {
	return (
		<motion.div
			className={styles.descriptionPara}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
		>
			<div className="container-lg2">
				<motion.h2 variants={fadeUp}>Safeguarding Your Trading Capital</motion.h2>

				<motion.p variants={fadeUp} transition={{ delay: 0.2, duration: 0.8 }}>
					At SecureFx, protecting client funds is the foundation of our
					business. Regulated by the Labuan Financial Services Authority and
					registered in Canada (License No. 2025053949), we uphold the highest
					international standards of security and transparency. Client funds are
					fully segregated in top-tier global banks such as Barclays Bank PLC,
					ensuring they remain separate from company operations. Every account
					is covered by USD 1 million professional indemnity insurance and a
					€2.5 million civil liability policy, providing multi-layered
					protection. With negative balance protection, membership in the
					Investor Compensation Fund, and strong risk management frameworks,
					SecureFx ensures your capital is always safeguarded.
				</motion.p>
			</div>
		</motion.div>
	);
}
