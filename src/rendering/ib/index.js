import React from "react";
import styles from "./ibmodule.module.scss";
import IbBanner from "./ibBanner";
import TrustedBroker from "./trustedBroker";
import WhySecureFx from "../homePage/whySecureFx";
import ExpectedMonthlyDeposits from "./expectedMonthlyDeposits";
import JointheSecureFx from "./jointheSecureFx";
import WorldsTrustedForm from "../homePage/worldsTrustedForm";
import { ibDataJson } from "@/constants/data";
export default function Ib() {
	return (
		<div>
			<IbBanner />
			<TrustedBroker />
			<WhySecureFx data={ibDataJson.ibsecurefx} />
			<ExpectedMonthlyDeposits />
			<JointheSecureFx data={ibDataJson.program} />
			<div className={styles.spacingAlignment}>
				<WorldsTrustedForm form="affliateForm" />
			</div>
		</div>
	);
}
