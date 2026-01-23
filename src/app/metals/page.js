import Metals from "@/rendering/metals";
import React from "react";

export const metadata = {
	title: "Metals Trading - SecureFX",
	description: "Trade precious metals with competitive pricing",
};

export default function page() {
	return (
		<div>
			<Metals />
		</div>
	);
}
