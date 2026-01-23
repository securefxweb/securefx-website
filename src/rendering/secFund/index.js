import React from "react";
import SecFundBanner from "./secFundBanner";
import DescriptionPara from "./descriptionPara";
import SecFundDetailsCard from "./secFundDetailsCard";

export default function SecFund() {
	return (
		<div>
			<SecFundBanner />
			<DescriptionPara />
			<SecFundDetailsCard />
		</div>
	);
}
