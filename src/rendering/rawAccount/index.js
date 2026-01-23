import React from "react";
import styles from "./rawAccount.module.scss";
import SimplicitySection from "../standardAccount/simplicitySection";
import DepositInSecond from "../standardAccount/depositInSecond";
import RawAccountBanner from "./rawAccountBanner";
import { rawAccountData } from "@/constants/data";
export default function RawAccount() {
	return (
		<div>
			<RawAccountBanner data={rawAccountData} />
			<SimplicitySection data={rawAccountData} />
			<DepositInSecond />
		</div>
	);
}
