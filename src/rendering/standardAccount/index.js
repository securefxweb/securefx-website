import React from "react";
import styles from "./standardAccount.module.scss";
import StandardAccountBanner from "./standardAccountBanner";
import SimplicitySection from "./simplicitySection";
import DepositInSecond from "./depositInSecond";
import { standardAccountData } from "@/constants/data";
export default function StandardAccount() {
	return (
		<>
			<StandardAccountBanner data={standardAccountData} />
			<SimplicitySection data={standardAccountData} />
			<DepositInSecond />
		</>
	);
}
