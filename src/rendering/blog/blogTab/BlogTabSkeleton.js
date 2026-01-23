import React from "react";
import styles from "./blogTab.module.scss";
import skeletonStyles from "./BlogTabSkeleton.module.scss";

export default function BlogTabSkeleton() {
	return (
		<div className={styles.blogTab}>
			<div className="container-lg">
				<div className={styles.tabAlignment}>
					{[...Array(5)].map((_, index) => (
						<div
							key={index}
							className={`${styles.buttonUi} ${skeletonStyles.skeletonButton}`}
						>
							<span></span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
