import React from "react";
import AffiliateBanner from "./affiliateBanner";
import OurAffiliate from "./ourAffiliate";
import GetStartedSection from "./getStarted";
import { affiliateData } from "@/constants/data";
import WhySecureFx from "../homePage/whySecureFx";
import WorldsTrustedForm from "../homePage/worldsTrustedForm";
import MobileViewForm from "../homePage/mobileViewForm";

export default function Affiliate() {
	return (
		<div>
			<AffiliateBanner data={affiliateData} />
			<OurAffiliate data={affiliateData.ourAffiliate} />
			<GetStartedSection data={affiliateData.benefits} />
			<WhySecureFx data={affiliateData.whySecureFx} />
			<WorldsTrustedForm
				leftSteps={affiliateData.formSteps.leftSteps}
				rightSteps={affiliateData.formSteps.rightSteps}
				form={"affliateForm"}
			/>
			<MobileViewForm allSpaceRemove={true} />
		</div>
	);
}
