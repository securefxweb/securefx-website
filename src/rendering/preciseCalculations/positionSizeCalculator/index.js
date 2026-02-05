import React, { useState } from "react";
import styles from "./positionSizeCalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { FOREX_INSTRUMENTS } from "@/utils/forexUtils";

export default function PositionSizeCalculator() {
  const [formData, setFormData] = useState({
    accountCurrency: "USD",
    accountBalance: "",
    riskPercentage: "",
    stopLoss: "",
    currencyPair: "EUR/USD",
  });

  const [results, setResults] = useState({
    amountAtRisk: "0 USD",
    positionSizeUnits: "0",
    standardLots: "0",
    miniLots: "0",
    microLots: "0",
  });

  const currencies = ["USD", "EUR", "GBP", "JPY"];

  const handleCalculate = () => {
    const { accountBalance, riskPercentage, stopLoss, currencyPair } = formData;

    // Validate inputs
    if (!accountBalance || !riskPercentage || !stopLoss) {
      return;
    }

    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercentage);
    const stopLossPips = parseFloat(stopLoss);

    // Calculate amount at risk
    const amountAtRisk = balance * (risk / 100);

    // Pip value calculation (simplified for EUR/USD and similar pairs)
    // For JPY pairs, pip value is different
    const pipValue = currencyPair.includes("JPY") ? 0.01 : 0.0001;

    // Calculate position size in units
    const positionSizeUnits = amountAtRisk / (stopLossPips * pipValue);

    // Convert to lot sizes
    const standardLots = positionSizeUnits / 100000;
    const miniLots = positionSizeUnits / 10000;
    const microLots = positionSizeUnits / 1000;

    setResults({
      amountAtRisk: `${amountAtRisk.toFixed(2)} ${formData.accountCurrency}`,
      positionSizeUnits: positionSizeUnits.toFixed(4),
      standardLots: standardLots.toFixed(4),
      miniLots: miniLots.toFixed(4),
      microLots: microLots.toFixed(4),
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.positionSizeCalculator}>
      <div className={styles.title}>
        <h2>Position Size Calculator</h2>
      </div>
      <div className={styles.twoCol}>
        <Dropdown
          label="Account Currency"
          placeholder="USD"
          items={currencies}
          value={formData.accountCurrency}
          onChange={(value) => handleInputChange("accountCurrency", value)}
        />
        <Input
          label="Account Balance"
          placeholder="100"
          value={formData.accountBalance}
          onChange={(e) => handleInputChange("accountBalance", e.target.value)}
        />
        <Input
          label="Risk Percentage"
          placeholder="1%"
          value={formData.riskPercentage}
          onChange={(e) => handleInputChange("riskPercentage", e.target.value)}
        />
        <Input
          label="Stop Loss (pips)"
          placeholder="45"
          value={formData.stopLoss}
          onChange={(e) => handleInputChange("stopLoss", e.target.value)}
        />
        <Dropdown
          label="Currency Pair"
          placeholder="EUR/USD"
          items={FOREX_INSTRUMENTS}
          value={formData.currencyPair}
          onChange={(value) => handleInputChange("currencyPair", value)}
        />
      </div>
      <div className={styles.buttonAlignment}>
        <Button widthfull text="Calculate" onClick={handleCalculate} />
      </div>
      <div className={styles.resultsSection}>
        <h3>Results</h3>
        <div className={styles.resultItem}>
          <p className={styles.label}>Amount at Risk</p>
          <p className={styles.value}>{results.amountAtRisk}</p>
        </div>
        <div className={styles.resultItem}>
          <p className={styles.label}>Position Size (units)</p>
          <p className={styles.value}>{results.positionSizeUnits}</p>
        </div>
        <div className={styles.resultItem}>
          <p className={styles.label}>Standard Lots</p>
          <p className={styles.value}>{results.standardLots}</p>
        </div>
        <div className={styles.resultItem}>
          <p className={styles.label}>Mini Lots</p>
          <p className={styles.value}>{results.miniLots}</p>
        </div>
        <div className={styles.resultItem}>
          <p className={styles.label}>Micro Lots</p>
          <p className={styles.value}>{results.microLots}</p>
        </div>
      </div>
    </div>
  );
}
