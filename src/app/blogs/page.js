import Blog from "@/rendering/blog";
import React from "react";

export const metadata = {
	title: "Blogs",
	description: "Secure fx blog ",
};

export default function page() {
	return (
		<div>
			<Blog />
		</div>
	);
}
