import React from "react";
import styles from "./jointheSecureFx.module.scss";
const StepImage = "/assets/images/ib-image-secure-fx.png";

export default function JointheSecureFx({ data }) {
	return (
		<div className={styles.jointheSecureFx}>
			<div className="container-lg3">
				<div className={styles.title}>
					<h2>How to Join the SecureFX IB Program</h2>
					<p>
						Start earning more by referring traders and growing your network
					</p>
				</div>
				<div className={styles.allCardAlignment}>
					{data.map((item, index) => {
						return (
							<div key={item.id} className={styles.termsboxmain}>
								<div className={styles.termsimageboxmain}>
									<div className={styles.termsimagebox}>
										<img src={StepImage} alt="Prod_image" />
									</div>
								</div>
								<div className={styles.termsbox}>
									<span> {`${index + 1}.${item.title}`}</span>
									<p>{item.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
