import Energy from "@/rendering/energy";
import React from "react";

export const metadata = {
	title: "Energy Trading - SecureFX",
	description: "Trade energy commodities with tight spreads",
};

export default function page() {
	return (
		<div>
			<Energy />
		</div>
	);
}
