import React from "react";
import ProductBanner from "../forex/productBanner";
import FlipCardSection from "../forex/flipCardSection";
import ProductSteps from "../forex/productSteps";
import Commoditiestrading from "./commoditiestrading";
import { commoditiesData, productLinksData } from "@/constants/data";
export default function Commodities() {
	return (
		<div>
			<ProductBanner
				productLinks={productLinksData}
				productData={commoditiesData}
			/>
			<FlipCardSection />
			<Commoditiestrading trading={commoditiesData.trading} />
			<ProductSteps stapesData={commoditiesData} />
		</div>
	);
}
