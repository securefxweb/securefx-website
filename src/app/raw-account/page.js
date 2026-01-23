import RawAccount from "@/rendering/rawAccount";
import React from "react";

export const metadata = {
	title: "Raw Account - SecureFX",
	description: "Raw spread trading account with institutional pricing",
};

export default function page() {
	return (
		<div>
			<RawAccount />
		</div>
	);
}
