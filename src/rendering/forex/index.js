import React from "react";
import styles from "./product.module.scss";
import ProductBanner from "./productBanner";
import FlipCardSection from "./flipCardSection";
import ForexTrading from "./forexTrading";
import ProductSteps from "./productSteps";
import { forexData, productLinksData } from "@/constants/data";
export default function Product() {
	return (
		<div>
			<ProductBanner productLinks={productLinksData} productData={forexData} />
			<FlipCardSection />
			<ForexTrading trading={forexData.trading} />
			<ProductSteps stapesData={forexData} />
		</div>
	);
}
