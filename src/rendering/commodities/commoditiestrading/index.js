import React from "react";
import styles from "./commoditiestrading.module.scss";
const CommoditiesImage = "/assets/images/Commodities.png";
export default function Commoditiestrading({ trading }) {
	return (
		<div className={styles.commoditiestrading}>
			<div className="container-lg5">
				<div className={styles.grid}>
					<div className={styles.text}>
						<h2>{trading?.title}</h2>
						{trading?.content?.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<div className={styles.image}>
						<img src={trading?.image} alt="CommoditiesImage" />
					</div>
				</div>
			</div>
		</div>
	);
}
