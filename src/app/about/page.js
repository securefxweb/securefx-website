import About from "@/rendering/about";
import React from "react";
export const metadata = {
	title: "About - SecureFX",
	description: "Standard trading account with competitive spreads",
};
export default function page() {
	return (
		<div>
			<About />
		</div>
	);
}
