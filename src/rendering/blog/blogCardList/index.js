"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./blogCardList.module.scss";
const BlogCardImage = "/assets/images/blog-card.png";

export default function BlogCardList({ blogs, selectedCategory }) {
	const [visibleCount, setVisibleCount] = useState(6);
	const formatDate = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);

		const day = date.getDate(); // no leading zero
		const month = date.toLocaleString("en", { month: "long" }); // full month name
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	};
	const filteredBlogs =
		selectedCategory === "all"
			? blogs
			: blogs?.filter(
					(blog) =>
						blog.category?.toLowerCase() === selectedCategory.toLowerCase(),
				);

	const displayedBlogs = filteredBlogs?.slice(0, visibleCount);
	const hasMoreBlogs = filteredBlogs?.length > visibleCount;

	useEffect(() => {
		setVisibleCount(6);
	}, [selectedCategory]);

	const handleViewMore = () => {
		setVisibleCount((prev) => prev + 6);
	};

	return (
		<div className={styles.blogCardListAlignent}>
			<div className="container-lg">
				<div className={styles.grid}>
					{displayedBlogs?.length > 0 ? (
						displayedBlogs.map((blog, i) => {
							return (
								<Link key={blog.id || i} href={`/blogs/${blog.slug}`}>
									<div className={styles.griditems}>
										<div className={styles.image}>
											<img src={blog.image || BlogCardImage} alt={blog.title} />
										</div>
										<div className={styles.details}>
											<div className={styles.cardbodyAlignment}>
												<p>{formatDate(blog.publishDate || blog.date)}</p>
												<button>{blog.category}</button>
											</div>
											<h3>{blog.title}</h3>
										</div>
									</div>
								</Link>
							);
						})
					) : (
						<div className={styles.noBlogsCard}>
							<h3>No blogs yet</h3>
							<p>Check back later for new content</p>
						</div>
					)}
				</div>
				{displayedBlogs?.length > 0 && (
					<div className={styles.viewmoreButton}>
						<div
							className={`${styles.buttonUi} ${
								!hasMoreBlogs ? styles.disabled : ""
							}`}
							onClick={hasMoreBlogs ? handleViewMore : undefined}
						>
							<div className={styles.layer}></div>
							<div className={styles.layer2}></div>
							<span>{"View More"}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
