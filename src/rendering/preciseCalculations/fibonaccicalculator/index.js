import React, { useState } from "react";
import styles from "./fibonaccicalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculateFibonacci } from "@/utils/calculations";

export default function Fibonaccicalculator() {
	const [formData, setFormData] = useState({
		trendDirection: "UP",
		calculationType: "retracement",
		lowPrice: "",
		highPrice: "",
	});
	const [results, setResults] = useState([]);

	const trendDirections = ["UP", "DOWN"];

	const handleCalculate = () => {
		const { lowPrice, highPrice, calculationType, trendDirection } = formData;
		const results = calculateFibonacci(
			lowPrice,
			highPrice,
			calculationType,
			trendDirection,
		);
		setResults(results);
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className={styles.fibonaccicalculator}>
			<div className={styles.title}>
				<h2>Fibonacci calculator</h2>
			</div>
			<div className={styles.twoCol}>
				<Dropdown
					label="Trend direction"
					placeholder="UP"
					items={trendDirections}
					value={formData.trendDirection}
					onChange={(value) => handleInputChange("trendDirection", value)}
				/>
				<div className={styles.itemsCenter}>
					<div className={styles.allRadioAlignment}>
						<div className={styles.radiText}>
							<input
								type="radio"
								name="calculationType"
								checked={formData.calculationType === "retracement"}
								onChange={() =>
									handleInputChange("calculationType", "retracement")
								}
							/>
							<label>Retracement</label>
						</div>
						<div className={styles.radiText}>
							<input
								type="radio"
								name="calculationType"
								checked={formData.calculationType === "projection"}
								onChange={() =>
									handleInputChange("calculationType", "projection")
								}
							/>
							<label>Projection</label>
						</div>
					</div>
				</div>
				<Input
					label="Low price"
					placeholder="Enter low price (e.g., 900)"
					value={formData.lowPrice}
					onChange={(e) => handleInputChange("lowPrice", e.target.value)}
				/>
				<Input
					label="High price"
					placeholder="Enter high price (e.g., 1000)"
					value={formData.highPrice}
					onChange={(e) => handleInputChange("highPrice", e.target.value)}
				/>
			</div>
			<div className={styles.buttonAlignment}>
				<Button widthfull text="Calculate" onClick={handleCalculate} />
			</div>
			<div className={styles.tableData}>
				<table>
					<thead>
						<tr>
							<th>Level</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{results.map((item, index) => (
							<tr key={index}>
								<td>{item.level}</td>
								<td>{item.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
