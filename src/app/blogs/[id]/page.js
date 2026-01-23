import BlogDetailsPage from "@/rendering/blogDetails";
import React from "react";
import { blogService } from "@/services/blogs";

export async function generateMetadata({ params }) {
	const resolvedParams = await params;
	try {
		const response = await blogService.getBlogBySlug(resolvedParams.id);
		const blog = response.data.data[0];

		return {
			title: blog?.title
				? `${blog.title} - SecureFX`
				: `${resolvedParams.id} - SecureFX`,
			description:
				blog?.description ||
				"Read detailed trading insights and market analysis",
		};
	} catch (error) {
		return {
			title: `${resolvedParams.id} - SecureFX`,
			description: "Read detailed trading insights and market analysis",
		};
	}
}

const BlogsDetails = async ({ params }) => {
	const resolvedParams = await params;
	return <BlogDetailsPage slug={resolvedParams.id} />;
};

export default BlogsDetails;
