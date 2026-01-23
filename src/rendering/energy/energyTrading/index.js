import React from "react";
import styles from "./energyTrading.module.scss";
const EnergyImage = "/assets/images/Energy.png";

export default function EnergyTrading({ trading }) {
	return (
		<div className={styles.energyTrading}>
			<div className="container-lg5">
				<div className={styles.grid}>
					<div className={styles.text}>
						<h2>{trading?.title}</h2>
						{trading?.content?.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<div className={styles.image}>
						<img src={trading?.image} alt="EnergyImage" />
					</div>
				</div>
			</div>
		</div>
	);
}
