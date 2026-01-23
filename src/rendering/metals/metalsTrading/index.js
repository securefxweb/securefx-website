import React from "react";
import styles from "./metalsTrading.module.scss";

export default function MetalsTrading({ trading }) {
	return (
		<div className={styles.metalsTrading}>
			<div className="container-lg5">
				<div className={styles.grid}>
					<div className={styles.text}>
						<h2>{trading?.title}</h2>
						{trading?.content?.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<div className={styles.image}>
						<img src={trading?.image} alt="MetalsImage" />
					</div>
				</div>
			</div>
		</div>
	);
}
