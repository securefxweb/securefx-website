"use client";
import { useState } from "react";
import styles from "./depositData.module.scss";
import classNames from "classnames";
const SticpayIcon = "/assets/icons/Sticpay.svg";
const UsdtIcon = "/assets/icons/usdt.svg";
const BankIcon = "/assets/icons/bank.svg";
const MastercardIcon = "/assets/icons/Mastercard.svg";
const VisacardIcon = "/assets/icons/Visacard.svg";
import { motion } from "framer-motion";
import DepositTable from "../depositTable";
import { paymentMethodsData } from "@/constants/data";
export default function DepositData() {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{ icon: SticpayIcon, label: "Sticpay" },
		{ icon: UsdtIcon, label: "USDT" },
		{ icon: BankIcon, label: "Local Bank" },
		{ icon: MastercardIcon, label: "Mastercard" },
		{ icon: VisacardIcon, label: "Visacard" },
	];
	return (
		<div className={styles.depositDatasection}>
			<div className="container-lg3">
				<div className={styles.box}>
					<div className={styles.tabDesign}>
						{tabs.map((tab, index) => (
							<div
								key={index}
								className={classNames(styles.buttonUi, {
									[styles.activeButton]: activeTab === index,
								})}
								onClick={() => setActiveTab(index)}
							>
								<div className={styles.layer}></div>
								<div className={styles.layer2}></div>
								<img src={tab.icon} alt={tab.label} />
								<span>{tab.label}</span>
							</div>
						))}
					</div>
					<div className={styles.allDataAlignment}>
						<DepositTable data={paymentMethodsData.paymentMethods[activeTab]} />
					</div>
					<div className={styles.buttonCenterAlignment}>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 200 }}
						>
							<div className={styles.buttonStyle}>
								<div className={styles.buttonUi}>
									<div className={styles.layer}></div>
									<div className={styles.layer2}></div>
									<span>Make a deposite</span>
								</div>
							</div>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 200 }}
						>
							<div className={styles.buttonUi}>
								<div className={styles.layer}></div>
								<div className={styles.layer2}></div>
								<span>Withdraw</span>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
