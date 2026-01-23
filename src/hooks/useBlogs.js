"use client";
import { useState, useEffect } from "react";
import { blogService } from "../services/blogs";

export const useBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchAllBlogs = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await blogService.getAllBlogs();
			setBlogs(response.data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchBlogBySlug = async (slug) => {
		setLoading(true);
		setError(null);
		try {
			const response = await blogService.getBlogBySlug(slug);
			return response.data.data[0];
		} catch (err) {
			setError(err.message);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const fetchBlogsByCategory = async (category) => {
		setLoading(true);
		setError(null);
		try {
			const response = await blogService.getBlogsByCategory(category);
			setBlogs(response.data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		blogs,
		loading,
		error,
		fetchAllBlogs,
		fetchBlogBySlug,
		fetchBlogsByCategory,
	};
};
