import ProAccount from "@/rendering/proAccount";
import React from "react";

export const metadata = {
	title: "Pro Account - SecureFX",
	description: "Professional trading account with advanced features",
};

export default function page() {
	return (
		<div>
			<ProAccount />
		</div>
	);
}
