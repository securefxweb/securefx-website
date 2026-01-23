import React, { useState } from "react";
import styles from "./pivotPointCalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculatePivotPoints } from "@/utils/calculations";

export default function PivotPointCalculator() {
	const [formData, setFormData] = useState({
		type: "Standard",
		highPrice: "",
		lowPrice: "",
		closePrice: "",
	});
	const [results, setResults] = useState([]);

	const types = ["Standard", "Fibonacci", "Camarilla"];

	const handleCalculate = () => {
		const { highPrice, lowPrice, closePrice, type } = formData;
		const results = calculatePivotPoints(highPrice, lowPrice, closePrice, type);
		setResults(results);
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className={styles.pivotPointCalculator}>
			<div className={styles.title}>
				<h2>Pivot point calculator</h2>
			</div>
			<div className={styles.twoCol}>
				<Dropdown
					label="Type"
					placeholder="Standard"
					items={types}
					value={formData.type}
					onChange={(value) => handleInputChange("type", value)}
				/>
				<Input
					label="High price"
					placeholder="Enter high price (e.g., 1.2000)"
					value={formData.highPrice}
					onChange={(e) => handleInputChange("highPrice", e.target.value)}
				/>
				<Input
					label="Low price"
					placeholder="Enter low price (e.g., 1.1800)"
					value={formData.lowPrice}
					onChange={(e) => handleInputChange("lowPrice", e.target.value)}
				/>
				<Input
					label="Close price"
					placeholder="Enter close price (e.g., 1.1900)"
					value={formData.closePrice}
					onChange={(e) => handleInputChange("closePrice", e.target.value)}
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
