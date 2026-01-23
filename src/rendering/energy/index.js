import React from "react";
import ProductBanner from "../forex/productBanner";
import FlipCardSection from "../forex/flipCardSection";
import ProductSteps from "../forex/productSteps";
import EnergyTrading from "./energyTrading";
import { energyData, productLinksData } from "@/constants/data";
export default function Energy() {
	return (
		<div>
			<ProductBanner productLinks={productLinksData} productData={energyData} />
			<FlipCardSection />
			<EnergyTrading trading={energyData} />
			<ProductSteps stapesData={energyData} />
		</div>
	);
}
