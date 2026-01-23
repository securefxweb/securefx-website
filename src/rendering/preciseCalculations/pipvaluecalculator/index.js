import React, { useState } from "react";
import styles from "./pipvaluecalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculatePipValue } from "@/utils/calculations";

export default function Pipvaluecalculator() {
	const [formData, setFormData] = useState({
		pips: "",
		instrument: "EUR/USD",
		lots: "",
		depositCurrency: "US Dollar",
		pipSize: "",
	});
	const [result, setResult] = useState("US$ 0.00");

	const instruments = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"];
	const currencies = ["US Dollar", "Euro", "British Pound", "Japanese Yen"];

	const handleCalculate = () => {
		const { pips, lots, pipSize } = formData;
		const result = calculatePipValue(pips, lots, pipSize);
		setResult(result);
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className={styles.pipvaluecalculator}>
			<div className={styles.title}>
				<h2>Pip value calculator</h2>
			</div>
			<div className={styles.twoCol}>
				<Input
					label="Pips"
					placeholder="Enter number of pips (e.g., 10)"
					value={formData.pips}
					onChange={(e) => handleInputChange("pips", e.target.value)}
				/>
				<Dropdown
					label="Instrument"
					placeholder="EUR/USD"
					items={instruments}
					value={formData.instrument}
					onChange={(value) => handleInputChange("instrument", value)}
				/>
				<Input
					label="Lots (trade size)"
					placeholder="Enter lot size (e.g., 1.0)"
					value={formData.lots}
					onChange={(e) => handleInputChange("lots", e.target.value)}
				/>
				<Dropdown
					label="Deposit Currency"
					placeholder="US Dollar"
					items={currencies}
					value={formData.depositCurrency}
					onChange={(value) => handleInputChange("depositCurrency", value)}
				/>
				<Input
					label="Pip Size"
					placeholder="Enter pip size (e.g., 0.0001)"
					value={formData.pipSize}
					onChange={(e) => handleInputChange("pipSize", e.target.value)}
				/>
			</div>
			<div className={styles.buttonAlignment}>
				<Button widthfull text="Calculate" onClick={handleCalculate} />
			</div>
			<div className={styles.lastText}>
				<p>{result}</p>
			</div>
		</div>
	);
}
