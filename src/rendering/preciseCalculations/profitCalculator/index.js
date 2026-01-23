import React, { useState } from "react";
import styles from "./profitCalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculateProfit } from "@/utils/calculations";

export default function ProfitCalculator() {
	const [formData, setFormData] = useState({
		instrument: "EUR/USD",
		depositCurrency: "US Dollar",
		tradeType: "Buy",
		lots: "1",
		openPrice: "",
		closePrice: "",
		pipSize: "",
	});
	const [results, setResults] = useState({
		profitMoney: "US$ 0.00",
		profitPips: "0",
	});

	const instruments = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"];
	const currencies = ["US Dollar", "Euro", "British Pound", "Japanese Yen"];
	const tradeTypes = ["Buy", "Sell"];
	const lotSizes = ["0.01", "0.1", "1", "10"];

	const handleCalculate = () => {
		const { tradeType, lots, openPrice, closePrice, pipSize } = formData;
		const results = calculateProfit(
			tradeType,
			lots,
			openPrice,
			closePrice,
			pipSize,
		);
		setResults(results);
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className={styles.pipvaluecalculator}>
			<div className={styles.title}>
				<h2>Profit calculator</h2>
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
				<Dropdown
					label="Buy or Sell"
					placeholder="Buy"
					items={tradeTypes}
					value={formData.tradeType}
					onChange={(value) => handleInputChange("tradeType", value)}
				/>
				<Dropdown
					label="Lots (trade size)"
					placeholder="1"
					items={lotSizes}
					value={formData.lots}
					onChange={(value) => handleInputChange("lots", value)}
				/>
				<Input
					label="Open price"
					placeholder="Enter open price (e.g., 1.15614)"
					value={formData.openPrice}
					onChange={(e) => handleInputChange("openPrice", e.target.value)}
				/>
				<Input
					label="Close price"
					placeholder="Enter close price (e.g., 1.17614)"
					value={formData.closePrice}
					onChange={(e) => handleInputChange("closePrice", e.target.value)}
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
			<div className={styles.textgrid}>
				<div>
					<p>Profit in money</p>
					<h4>{results.profitMoney}</h4>
				</div>
				<div>
					<p>Profit in pips</p>
					<h4>{results.profitPips}</h4>
				</div>
			</div>
		</div>
	);
}
