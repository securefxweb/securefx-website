import Calendar from "@/rendering/calendar";
import React from "react";

export const metadata = {
	title: "Calendar - SecureFX",
	description: "Economic calendar and trading events",
};

export default function page() {
	return (
		<div>
			<Calendar />
		</div>
	);
}
