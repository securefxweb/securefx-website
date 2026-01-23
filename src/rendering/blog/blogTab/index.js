import React from "react";
import styles from "./blogTab.module.scss";

export default function BlogTab({
	blogs,
	selectedCategory,
	setSelectedCategory,
}) {
	const categories = [
		"all",
		...new Set(blogs?.map((blog) => blog.category).filter(Boolean)),
	];

	return (
		<div className={styles.blogTab}>
			<div className="container-lg">
				<div className={styles.tabAlignment}>
					{categories.map((category, index) => (
						<div
							key={index}
							className={`${styles.buttonUi} ${selectedCategory === category ? styles.active : ""}`}
							onClick={() => setSelectedCategory(category)}
						>
							<span>{category === "all" ? "All" : category}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
