import React, { useState } from "react";
import styles from "./forexmargincalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculateMargin } from "@/utils/calculations";

export default function Forexmargincalculator() {
	const [formData, setFormData] = useState({
		instrument: "EUR/USD",
		depositCurrency: "US Dollar",
		leverage: "",
		lots: "1",
		price: "",
	});
	const [result, setResult] = useState("US$ 0.00");

	const instruments = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"];
	const currencies = ["US Dollar", "Euro", "British Pound", "Japanese Yen"];
	const lotSizes = ["0.01", "0.1", "1", "10"];

	const handleCalculate = () => {
		const { leverage, lots, price } = formData;
		const result = calculateMargin(leverage, lots, price);
		setResult(result);
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className={styles.forexmargincalculator}>
			<div className={styles.title}>
				<h2>Forex margin calculator</h2>
			</div>
			<div className={styles.twoCol}>
				<Dropdown
					label="Instrument"
					placeholder="EUR/USD"
					items={instruments}
					value={formData.instrument}
					onChange={(value) => handleInputChange("instrument", value)}
				/>
				<Dropdown
					label="Deposit currency"
					placeholder="US Dollar"
					items={currencies}
					value={formData.depositCurrency}
					onChange={(value) => handleInputChange("depositCurrency", value)}
				/>
				<Input
					label="Leverage"
					placeholder="Enter leverage ratio (e.g., 100:1)"
					value={formData.leverage}
					onChange={(e) => handleInputChange("leverage", e.target.value)}
				/>
				<Dropdown
					label="Lots (trade size)"
					placeholder="1"
					items={lotSizes}
					value={formData.lots}
					onChange={(value) => handleInputChange("lots", value)}
				/>
				<Input
					label="Current Price"
					placeholder="Enter current price (e.g., 1.15614)"
					value={formData.price}
					onChange={(e) => handleInputChange("price", e.target.value)}
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
