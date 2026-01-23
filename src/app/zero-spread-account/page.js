import ZeroSpreadAccount from "@/rendering/zeroSpreadAccount";
import React from "react";

export const metadata = {
	title: "Zero Spread Account - SecureFX",
	description: "Zero spread trading account with commission-based pricing",
};

export default function page() {
	return (
		<div>
			<ZeroSpreadAccount />
		</div>
	);
}
