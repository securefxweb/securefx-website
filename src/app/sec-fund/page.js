import SecFund from "@/rendering/secFund";
import React from "react";

export const metadata = {
	title: "Segregated Funds - SecureFX",
	description: "Client fund protection and segregation policies",
};

export default function page() {
	return (
		<div>
			<SecFund />
		</div>
	);
}
