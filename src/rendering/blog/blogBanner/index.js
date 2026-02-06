import React from "react";
import styles from "./blogBanner.module.scss";
const Banner = "/assets/images/blog-banner.png";
export default function BlogBanner() {
	return (
		<div className={styles.blogBanner}>
			<div className="container-lg">
				<div className={styles.grid}>
					<div className={styles.griditems}>
						<h2>Think Smart. Trade Smarter.</h2>
						<p>
							Stay informed with SecureFX market reports, expert tips, and
							powerful trading knowledge.
						</p>
					</div>
					<div className={styles.griditems}>
						<div className={styles.image}>
							<img src={Banner} alt="Banner" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
