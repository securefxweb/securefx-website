import React from "react";
import styles from "./makesmT5.module.scss";
const MakesImage = "/assets/images/makes.png";
export default function MakesmT5({ data }) {
	return (
		<div className={styles.makesmT5Alignment}>
			<div className="container-md5">
				<div className={styles.grid}>
					<div className={styles.griditems}>
						<div className={styles.image}>
							<img src={MakesImage} alt="MakesImage" />
						</div>
					</div>
					<div className={styles.griditems}>
						<h3>{data.title}</h3>
						<p>{data.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
