import React from "react";
import styles from "./forexTrading.module.scss";
export default function ForexTrading({ trading }) {
	return (
		<div className={styles.forexTrading}>
			<div className="container-lg5">
				<div className={styles.grid}>
					<div className={styles.text}>
						<h2>{trading?.title}</h2>
						{trading?.content?.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<div className={styles.image}>
						<img src={trading?.image} alt="ForexTradingImage" />
					</div>
				</div>
			</div>
		</div>
	);
}
