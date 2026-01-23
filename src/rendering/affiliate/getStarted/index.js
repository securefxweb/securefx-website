import React from "react";
import styles from "./getStarted.module.scss";
const StepImage = "/assets/images/product-steps.png";
export default function GetStartedSection({ data }) {
	return (
		<div className={styles.getStarted}>
			<div className="container-lg3">
				<div className={styles.title}>
					<h2>{data?.title}</h2>
					<p>{data?.descriptions}</p>
				</div>
				<div className={styles.allCardAlignment}>
					{data.features.map((item, index) => {
						return (
							<div className={styles.termsboxmain} key={item.id}>
								<div className={styles.termsimageboxmain}>
									<div className={styles.termsimagebox}>
										<img src={data.image} alt="Prod_image" />
									</div>
								</div>
								<div className={styles.termsbox}>
									<span>
										{index + 1}. {item.title}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
