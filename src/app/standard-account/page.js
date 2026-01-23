import StandardAccount from "@/rendering/standardAccount";
import React from "react";

export const metadata = {
	title: "Standard Account - SecureFX",
	description: "Standard trading account with competitive spreads",
};

export default function page() {
	return (
		<div>
			<StandardAccount />
		</div>
	);
}
