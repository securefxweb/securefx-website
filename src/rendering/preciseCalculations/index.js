import React from "react";
import styles from "./preciseCalculations.module.scss";
import PreciseCalculationsBanner from "./preciseCalculationsBanner";
import PreciseCalculationsData from "./preciseCalculationsData";
export default function PreciseCalculations() {
	return (
		<div>
			<PreciseCalculationsBanner />
			<PreciseCalculationsData />
		</div>
	);
}
