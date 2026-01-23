import Indices from "@/rendering/indices";
import React from "react";

export const metadata = {
	title: "Indices Trading - SecureFX",
	description: "Trade global stock indices with low spreads",
};

export default function page() {
	return (
		<div>
			<Indices />
		</div>
	);
}
