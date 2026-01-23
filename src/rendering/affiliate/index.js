import React from "react";
import AffiliateBanner from "./affiliateBanner";
import OurAffiliate from "./ourAffiliate";
import GetStartedSection from "./getStarted";
import { affiliateData } from "@/constants/data";
import WhySecureFx from "../homePage/whySecureFx";
import WorldsTrustedForm from "../homePage/worldsTrustedForm";

export default function Affiliate() {
	return (
		<div>
			<AffiliateBanner data={affiliateData} />
			<OurAffiliate data={affiliateData.ourAffiliate} />
			<GetStartedSection data={affiliateData.benefits} />
			<WhySecureFx data={affiliateData.whySecureFx} />
			<WorldsTrustedForm form={"affliateForm"}  />
		</div>
	);
}
