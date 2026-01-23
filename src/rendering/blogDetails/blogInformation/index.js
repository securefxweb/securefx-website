"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useBlogs } from "@/hooks/useBlogs";
import { useParams } from "next/navigation";
import { marked } from "marked";
import styles from "./blogInformation.module.scss";
import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
import DateIcon from "@/icons/dateIcon";
const blogProfile = "/assets/icons/blog-profile.svg";
const DetailsBanner = "/assets/images/blog-details-banner.png";

const renderMarkdown = (markdown) => {
	marked.setOptions({
		headerIds: false,
		mangle: false,
	});

	let html = marked(markdown);

	html = html.replace(
		/<h([1-6])>(.+?)\s*\{#([^}]+)\}\s*<\/h[1-6]>/g,
		'<h$1 id="$3">$2</h$1>',
	);

	html = html.replace(/<table>/g, '<div class="table-responsive"><table>');
	html = html.replace(/<\/table>/g, "</table></div>");

	return { __html: html };
};

const extractTableOfContents = (markdown) => {
	const tocMatch = markdown.match(/## Table of Contents([\s\S]*?)---/);
	if (!tocMatch) return null;

	const tocContent = tocMatch[1];
	const lines = tocContent.split("\n").filter((line) => line.trim());

	const toc = [];

	lines.forEach((line) => {
		const numberedMatch = line.match(/^\d+\.\s*\[([^\]]+)\]\(#([^)]+)\)/);
		const nestedMatch = line.match(/^\s*-\s*\[([^\]]+)\]\(#([^)]+)\)/);

		if (numberedMatch) {
			toc.push({ title: numberedMatch[1], anchor: numberedMatch[2], level: 0 });
		} else if (nestedMatch) {
			toc.push({ title: nestedMatch[1], anchor: nestedMatch[2], level: 1 });
		}
	});

	return toc.length > 0 ? toc : null;
};

const removeTableOfContents = (markdown) => {
	return markdown.replace(/## Table of Contents[\s\S]*?---\s*/, "");
};

const formatDate = (dateString) => {
	if (!dateString) return "";
	const date = new Date(dateString);

	const day = date.getDate(); // no leading zero
	const month = date.toLocaleString("en", { month: "long" }); // full month name
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
};

export default function BlogInformation() {
	const params = useParams();
	const { fetchBlogBySlug } = useBlogs();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);

	const handleTOCClick = useCallback(
		(anchor) => (e) => {
			e.preventDefault();
			document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
		},
		[],
	);

	const tableOfContents = useMemo(
		() => (blog?.content ? extractTableOfContents(blog.content) : null),
		[blog?.content],
	);

	const contentWithoutTOC = useMemo(
		() => (blog?.content ? removeTableOfContents(blog.content) : ""),
		[blog?.content],
	);

	useEffect(() => {
		const getBlog = async () => {
			try {
				const blogData = await fetchBlogBySlug(params.id);
				setBlog(blogData?.data?.[0] || blogData);
			} catch (error) {
				console.error("Error fetching blog:", error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			getBlog();
		}
	}, [params.id]);

	if (loading) return <BlogDetailsSkeleton />;
	if (!blog) return <div>Blog not found</div>;

	return (
		<div>
			<div className={styles.blogBannerContentAlignment}>
				<div className="container-lg">
					<h2>{blog.title}</h2>
					<div className={styles.contentAlignment}>
						<div className={styles.iconText}>
							<img src={blogProfile} alt="blogProfile" />
							<span>By {blog.author || "SecureFX Insights"}</span>
						</div>
						<div className={styles.line}></div>
						<div className={styles.iconText}>
							<DateIcon />
							<span>{formatDate(blog.publishedAt || blog.date)}</span>
						</div>
					</div>
					<div className={styles.image}>
						<img src={blog.image || DetailsBanner} alt={blog.title} />
					</div>
					<div className={styles.grid}>
						<div className={styles.griditems}>
							<div className={styles.sidebar}>
								<h3>Contents</h3>
								<div className={styles.allListAlignment}>
									{tableOfContents ? (
										<ul>
											{tableOfContents.map((item, index) => (
												<li key={index}>
													<a
														href={`#${item.anchor}`}
														onClick={handleTOCClick(item.anchor)}
													>
														{item.title}
													</a>
												</li>
											))}
										</ul>
									) : (
										<ul>
											<li>Section 2</li>
											<li>Section 3</li>
											<li>Section 4</li>
											<li>Section 5</li>
										</ul>
									)}
								</div>
							</div>
						</div>
						<div className={styles.griditems}>
							<div className={styles.blogDetails}>
								{contentWithoutTOC ? (
									<div
										dangerouslySetInnerHTML={renderMarkdown(contentWithoutTOC)}
									/>
								) : (
									<>
										<h2>Sections 2</h2>
										<h3>Gold vs Forex: What Should You Trade in the UAE?</h3>
										<p>
											The United Arab Emirates has transformed into one of the
											world's premier trading destinations over the past decade.
										</p>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
