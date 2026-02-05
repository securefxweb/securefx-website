import React, { useState, useEffect } from "react";
import styles from "./profitCalculator.module.scss";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import { calculateProfit } from "@/utils/calculations";
import marketDataService from "@/services/marketDataService";
import { getPipSize, FOREX_INSTRUMENTS } from "@/utils/forexUtils";

export default function ProfitCalculator() {
  const [formData, setFormData] = useState({
    instrument: "EUR/USD",
    depositCurrency: "US Dollar",
    tradeType: "Buy",
    lots: "1",
    openPrice: "",
    closePrice: "",
    pipSize: "0.0001",
  });
  const [results, setResults] = useState({
    profitMoney: "US$ 0.00",
    profitPips: "0",
  });
  const [currentPrice, setCurrentPrice] = useState(null);

  const currencies = ["US Dollar", "Euro", "British Pound", "Japanese Yen"];
  const tradeTypes = ["Buy", "Sell"];
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

    // Auto-populate pip size based on instrument
    const pipSize = getPipSize(formData.instrument);
    setFormData((prev) => ({ ...prev, pipSize: pipSize.toString() }));
  }, [formData.instrument]);

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

  const useCurrentPriceForOpen = () => {
    if (currentPrice) {
      setFormData((prev) => ({ ...prev, openPrice: currentPrice.toString() }));
    }
  };

  const useCurrentPriceForClose = () => {
    if (currentPrice) {
      setFormData((prev) => ({ ...prev, closePrice: currentPrice.toString() }));
    }
  };

  return (
    <div className={styles.pipvaluecalculator}>
      <div className={styles.title}>
        <h2>Profit calculator</h2>
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
        <div style={{ position: "relative" }}>
          <Input
            label="Open price"
            placeholder="Enter open price (e.g., 1.15614)"
            value={formData.openPrice}
            onChange={(e) => handleInputChange("openPrice", e.target.value)}
          />
          {currentPrice && (
            <button
              onClick={useCurrentPriceForOpen}
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
        <div style={{ position: "relative" }}>
          <Input
            label="Close price"
            placeholder="Enter close price (e.g., 1.17614)"
            value={formData.closePrice}
            onChange={(e) => handleInputChange("closePrice", e.target.value)}
          />
          {currentPrice && (
            <button
              onClick={useCurrentPriceForClose}
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
        <Input
          label="Pip Size"
          placeholder="Auto-populated"
          value={formData.pipSize}
          onChange={(e) => handleInputChange("pipSize", e.target.value)}
          disabled
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
