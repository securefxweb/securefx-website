import React from "react";
import ProductBanner from "../forex/productBanner";
import FlipCardSection from "../forex/flipCardSection";
import ProductSteps from "../forex/productSteps";
import IndicesTrading from "./indicesTrading";
import { indicesData, productLinksData } from "@/constants/data";
export default function Indices() {
	return (
		<div>
			<ProductBanner
				productLinks={productLinksData}
				productData={indicesData}
			/>
			<FlipCardSection />
			<IndicesTrading trading={indicesData.trading} />
			<ProductSteps stapesData={indicesData} />
		</div>
	);
}
