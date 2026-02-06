import React from "react";
import styles from "./whyMt5.module.scss";
export default function WhyMt5({ data }) {
	return (
		<div className={styles.whyMt5}>
			<div className="container-md6">
				<div className={styles.sectionTitle}>
					<h2>{data?.title}</h2>
					<p>{data?.description}</p>
				</div>
				<div className={styles.sectionrelative}>
					<div className={styles.mainRelative}>
						<div className={styles.Round1}></div>
						<div className={styles.roundCenter}>
							<div className={styles.secRound}>
								<div>
									<div className={styles.iconCenter}>
										<img src={data.center.icon} alt="ExecutionIcon" />
									</div>
									<h3>{data.center.text}</h3>
									<p>{data.center.description}</p>
								</div>
							</div>
						</div>
					</div>
					{data?.features?.map((feature, index) => (
						<div
							key={feature.id}
							className={styles[["one", "two", "three", "four"][index]]}
						>
							<div className={styles.step}>
								{index === 2 ? (
									<>
										<div className={styles.center}>
											<div className={styles.counter}>{feature.counter}</div>
										</div>
										<div className={styles.textWrapper}>
											<p className={styles.featureTitle}>{feature.text}</p>
											<p className={styles.featureDescription}>
												{feature.description}
											</p>
										</div>
									</>
								) : (
									<>
										<div className={styles.textWrapper}>
											<p className={styles.featureTitle}>{feature.text}</p>
											<p className={styles.featureDescription}>
												{feature.description}
											</p>
										</div>
										<div className={styles.center}>
											<div className={styles.counter}>{feature.counter}</div>
										</div>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
