import React from "react";
import ProAccountBanner from "./proAccountBanner";
import SimplicitySection from "../standardAccount/simplicitySection";
import DepositInSecond from "../standardAccount/depositInSecond";
import { proAccountData } from "@/constants/data";
export default function ProAccount() {
	return (
		<div>
			<ProAccountBanner data={proAccountData} />
			<SimplicitySection data={proAccountData} />
			<DepositInSecond />
		</div>
	);
}
