import React from "react";
import styles from "./tradingPlateform.module.scss";
import TradingPlateformBanner from "./tradingPlateformBanner";
import TradeSmarter from "./tradeSmarter";
import AccessGlobalMarkets from "./accessGlobalMarkets";
import AnalyseMarketsPrecision from "./analyseMarketsPrecision";
import MakesmT5 from "./makesmT5";
import WhyMt5 from "./whyMt5";
import { tradingPlatformData } from "@/constants/data";
export default function TradingPlateform() {
	return (
		<div>
			<TradingPlateformBanner data={tradingPlatformData.mobile} />
			<TradeSmarter data={tradingPlatformData.mobile} />
			<AccessGlobalMarkets data={tradingPlatformData.mobile} />
			<AnalyseMarketsPrecision data={tradingPlatformData.analysis} />
			<MakesmT5 data={tradingPlatformData.choices} />
			<WhyMt5 data={tradingPlatformData.comparison} />
		</div>
	);
}
