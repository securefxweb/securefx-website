import api from "./apiConfig";

const blogFields = [
	"title",
	"slug",
	"author",
	"publishDate",
	"image",
	"category",
];
const fieldsQuery = blogFields
	.map((field, index) => `fields[${index}]=${field}`)
	.join("&");

export const blogService = {
	// Get all blogs
	getAllBlogs: () => api.get(`/api/blogs?${fieldsQuery}`),
	// Get blog by slug with populated data
	getBlogBySlug: (slug) =>
		api.get(`/api/blogs?filters[slug][$eq]=${slug}&populate=*`),

	// Get blogs by category
	getBlogsByCategory: (category) =>
		api.get(`/api/blogs?filters[category][$eq]=${category}`),
};
