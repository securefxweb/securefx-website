import Regulations from "@/rendering/regulations";
import React from "react";

export const metadata = {
	title: "Regulations - SecureFX",
	description: "Regulatory compliance and licensing information",
};

export default function page() {
	return (
		<div>
			<Regulations />
		</div>
	);
}
