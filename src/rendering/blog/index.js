"use client";
import React, { useEffect, useState } from "react";
import styles from "./blog.module.scss";
import BlogBanner from "./blogBanner";
import BlogTab from "./blogTab";
import BlogCardList from "./blogCardList";
import BlogTabSkeleton from "./blogTab/BlogTabSkeleton";
import BlogCardListSkeleton from "./blogCardList/BlogCardListSkeleton";
import TransferFunds from "./transferFunds";
import { useBlogs } from "@/hooks/useBlogs";

export default function Blog() {
	const { fetchAllBlogs, blogs, loading } = useBlogs();
	const [selectedCategory, setSelectedCategory] = useState("all");

	useEffect(() => {
		fetchAllBlogs();
	}, []);

	return (
		<div>
			<BlogBanner />
			{loading ? (
				<BlogTabSkeleton />
			) : (
				<BlogTab
					blogs={blogs}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			)}
			{loading ? (
				<BlogCardListSkeleton />
			) : (
				<BlogCardList blogs={blogs} selectedCategory={selectedCategory} />
			)}
			<TransferFunds />
		</div>
	);
}
