import Deposit from "@/rendering/deposit";
import React from "react";

export const metadata = {
	title: "Deposit with - SecureFX",
	description: "Secure and fast deposit methods",
};

export default function page() {
	return (
		<div>
			<Deposit />
		</div>
	);
}
