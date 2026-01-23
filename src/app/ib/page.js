import Ib from "@/rendering/ib";
import React from "react";
export const metadata = {
	title: "IB - SecureFX",
	description: "Standard trading account with competitive spreads",
};
export default function page() {
	return (
		<div>
			<Ib />
		</div>
	);
}
