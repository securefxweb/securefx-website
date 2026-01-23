import React from "react";
import styles from "./analyseMarketsPrecision.module.scss";
const ModesIcon = "/assets/icons/Modes.svg";
const LineIcon = "/assets/icons/line-row.svg";
export default function AnalyseMarketsPrecision({ data }) {
	return (
		<div className={styles.analyseMarketsPrecision}>
			<div className="container-lg">
				<div className={styles.title}>
					<h2>{data.title}</h2>
					<p>{data.description}</p>
				</div>
				<div className={styles.roundCenteralignment}>
					<div className={styles.roundBorder}>
						{data["features-analysis"].map((feature, index) => (
							<div key={index} className={styles.round}>
								<div className={styles.blurEffect}></div>
								<div className={styles.contentGrid}>
									<img src={ModesIcon} alt="ModesIcon" />
									<p>{feature.title}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={styles.mobileShow}>
					<div className={styles.mobileCenter}>
						<div className={styles.round}>
							<div className={styles.blurEffect}></div>
							<div className={styles.contentGrid}>
								<img src={ModesIcon} alt="ModesIcon" />
								<p>Multiple Chart Modes</p>
							</div>
						</div>
					</div>
					<div className={styles.twoMobile}>
						<div className={styles.round}>
							<div className={styles.blurEffect}></div>
							<div className={styles.contentGrid}>
								<img src={ModesIcon} alt="ModesIcon" />
								<p>Multiple Chart Modes</p>
							</div>
						</div>
						<div className={styles.round}>
							<div className={styles.blurEffect}></div>
							<div className={styles.contentGrid}>
								<img src={ModesIcon} alt="ModesIcon" />
								<p>Multiple Chart Modes</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.rightAlignmentText}>
					<img src={LineIcon} alt="LineIcon" />
					<p>
						Switch between line, bar, or candlestick charts for clearer trend
						analysis.
					</p>
				</div>
			</div>
		</div>
	);
}
