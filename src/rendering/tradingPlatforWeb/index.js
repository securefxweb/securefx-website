import React from "react";
import styles from "./tradingPlateforWeb.module.scss";
import TradingPlateformWebBanner from "./tradingPlateformWebBanner";
import TradingPlateforWebPower from "./tradingPlateforWebPower";
import AccessGlobalMarkets from "../tradingPlatform/accessGlobalMarkets";
import AnalyseMarketsPrecision from "../tradingPlatform/analyseMarketsPrecision";
import MakesmT5 from "../tradingPlatform/makesmT5";
import WhyMt5 from "../tradingPlatform/whyMt5";
import { tradingPlatformData } from "@/constants/data";
export default function TradingPlateforWeb() {
	return (
		<div>
			<TradingPlateformWebBanner data={tradingPlatformData.web} />
			<TradingPlateforWebPower data={tradingPlatformData.web} />
			<AccessGlobalMarkets />
			<AnalyseMarketsPrecision data={tradingPlatformData.analysis} />
			<MakesmT5 data={tradingPlatformData.choices} />
			<WhyMt5 data={tradingPlatformData.comparison} />
		</div>
	);
}
