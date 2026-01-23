import React from "react";
import styles from "./BlogDetailsSkeleton.module.scss";

const BlogDetailsSkeleton = () => {
	return (
		<div>
			<div className={styles.blogBannerContentAlignment}>
				<div className="container-lg">
					<div className={styles.titleSkeleton}></div>
					<div className={styles.contentAlignment}>
						<div className={styles.authorSkeleton}></div>
						<div className={styles.line}></div>
						<div className={styles.dateSkeleton}></div>
					</div>
					<div className={styles.imageSkeleton}></div>
					<div className={styles.grid}>
						<div className={styles.griditems}>
							<div className={styles.sidebar}>
								<div className={styles.tocTitleSkeleton}></div>
								<div className={styles.tocListSkeleton}>
									{[...Array(6)].map((_, index) => (
										<div key={index} className={styles.tocItemSkeleton}></div>
									))}
								</div>
							</div>
						</div>
						<div className={styles.griditems}>
							<div className={styles.blogDetails}>
								{[...Array(8)].map((_, index) => (
									<div key={index} className={styles.contentLineSkeleton}></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogDetailsSkeleton;
