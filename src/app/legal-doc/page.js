import LegalDoc from "@/rendering/legalDoc";
import React from "react";

export const metadata = {
	title: "Legal Documents - SecureFX",
	description: "Terms, conditions and legal documentation",
};

export default function page() {
	return (
		<div>
			<LegalDoc />
		</div>
	);
}
