import Product from "@/rendering/forex";
import React from "react";

export const metadata = {
	title: "Forex Trading - SecureFX",
	description: "Trade forex with competitive spreads and fast execution",
};

export default function page() {
	return (
		<div>
			<Product />
		</div>
	);
}
