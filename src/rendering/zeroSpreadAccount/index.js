import React from "react";
import ZeroSpreadAccountBanner from "./zeroSpreadAccountBanner";
import SimplicitySection from "../standardAccount/simplicitySection";
import DepositInSecond from "../standardAccount/depositInSecond";
import { zeroSpreadAccountData } from "@/constants/data";

export default function ZeroSpreadAccount() {
	return (
		<div>
			<ZeroSpreadAccountBanner data={zeroSpreadAccountData} />
			<SimplicitySection data={zeroSpreadAccountData} />
			<DepositInSecond />
		</div>
	);
}
