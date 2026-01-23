import React from "react";
import ProductBanner from "../forex/productBanner";
import FlipCardSection from "../forex/flipCardSection";
import MetalsTrading from "./metalsTrading";
import ProductSteps from "../forex/productSteps";
import { metalsData, productLinksData } from "@/constants/data";
export default function Metals() {
	return (
		<div>
			<ProductBanner productLinks={productLinksData} productData={metalsData} />
			<FlipCardSection />
			<MetalsTrading trading={metalsData.trading} />
			<ProductSteps stapesData={metalsData} />
		</div>
	);
}
