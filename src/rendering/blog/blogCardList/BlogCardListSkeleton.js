import React from "react";
import styles from "./blogCardList.module.scss";
import skeletonStyles from "./BlogCardListSkeleton.module.scss";

export default function BlogCardListSkeleton() {
	return (
		<div className={styles.blogCardListAlignent}>
			<div className="container-lg">
				<div className={styles.grid}>
					{[...Array(9)].map((_, i) => (
						<div key={i} className={styles.griditems}>
							<div className={styles.image}>
								<div className={skeletonStyles.skeletonImage}></div>
							</div>
							<div className={styles.details}>
								<div className={styles.cardbodyAlignment}>
									<div className={skeletonStyles.skeletonDate}></div>
									<div className={skeletonStyles.skeletonCategory}></div>
								</div>
								<div className={skeletonStyles.skeletonTitle}></div>
								<div className={skeletonStyles.skeletonTitleShort}></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
