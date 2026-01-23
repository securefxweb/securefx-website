import React from "react";
import styles from "./blogBanner.module.scss";
const Banner = "/assets/images/blog-banner.png";
export default function BlogBanner() {
	return (
		<div className={styles.blogBanner}>
			<div className="container-lg">
				<div className={styles.grid}>
					<div className={styles.griditems}>
						<h2>
							The <span>Securefx</span> blog
						</h2>
						<p>
							Get all the relevant market news and company updates in one place.
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
