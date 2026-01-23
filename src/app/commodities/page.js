import Commodities from "@/rendering/commodities";
import React from "react";

export const metadata = {
	title: "Commodities Trading - SecureFX",
	description: "Trade commodities with competitive spreads",
};

export default function page() {
	return (
		<div>
			<Commodities />
		</div>
	);
}
