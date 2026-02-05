import React, { useState, useEffect } from "react";
import styles from "./forexmargincalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculateMargin } from "@/utils/calculations";
import marketDataService from "@/services/marketDataService";
import { FOREX_INSTRUMENTS } from "@/utils/forexUtils";

export default function Forexmargincalculator() {
  const [formData, setFormData] = useState({
    instrument: "EUR/USD",
    depositCurrency: "US Dollar",
    leverage: "",
    lots: "1",
    price: "",
  });
  const [result, setResult] = useState("US$ 0.00");
  const [currentPrice, setCurrentPrice] = useState(null);

  const currencies = ["US Dollar", "Euro", "British Pound", "Japanese Yen"];
  const lotSizes = ["0.01", "0.1", "1", "10"];

  // Fetch price when instrument changes
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const priceData = await marketDataService.fetchPrice(
          formData.instrument,
        );
        setCurrentPrice(priceData.price);
      } catch (error) {
        console.error("Failed to fetch price:", error);
        setCurrentPrice(null);
      }
    };

    fetchPrice();
  }, [formData.instrument]);

  const handleCalculate = () => {
    const { leverage, lots, price } = formData;
    const result = calculateMargin(leverage, lots, price);
    setResult(result);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const useCurrentPrice = () => {
    if (currentPrice) {
      setFormData((prev) => ({ ...prev, price: currentPrice.toString() }));
    }
  };

  return (
    <div className={styles.forexmargincalculator}>
      <div className={styles.title}>
        <h2>Forex margin calculator</h2>
        {currentPrice && (
          <p style={{ fontSize: "14px", color: "#888", marginTop: "5px" }}>
            Current Price: {currentPrice}
          </p>
        )}
      </div>
      <div className={styles.twoCol}>
        <Dropdown
          label="Instrument"
          placeholder="EUR/USD"
          items={FOREX_INSTRUMENTS}
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
        <div style={{ position: "relative" }}>
          <Input
            label="Current Price"
            placeholder="Enter current price (e.g., 1.15614)"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
          {currentPrice && (
            <button
              onClick={useCurrentPrice}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                padding: "5px 10px",
                fontSize: "12px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Use Live
            </button>
          )}
        </div>
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
