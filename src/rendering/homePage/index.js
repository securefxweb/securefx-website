import React from "react";
import Herobanner from "./herobanner";
import WorldsTrusted from "./worldsTrusted";
import WorldsTrustedForm from "./worldsTrustedForm";
import Slidersection from "./slidersection";
import WhySecureFx from "./whySecureFx";
import ChoosePerfectAccount from "./choosePerfectAccount";
import TradeAnywhere from "./tradeAnywhere";
import SeamlessTradingSteps from "./seamlessTradingSteps";
import TrustedbyTraders from "./trustedbyTraders";
import IntroducingBrokers from "./introducingBrokers";
import MobileViewForm from "./mobileViewForm";
import { highlights } from "@/constants/data";
export default function Homepage() {
	return (
		<div>
			<Herobanner />
			<WorldsTrusted formData={"demoAccountform"} />
			<MobileViewForm />
			<Slidersection />
			{/* <WhySecureFx data={highlights} />
			<ChoosePerfectAccount />
			<TradeAnywhere />
			<SeamlessTradingSteps />
			<TrustedbyTraders />
			<IntroducingBrokers /> */}
		</div>
	);
}
