// PIP Value Calculator
// Proper forex pip value calculation with currency conversion
export const calculatePipValue = async (pips, lots, pipSize, instrument) => {
  if (pips && lots && pipSize) {
    const lotSize = parseFloat(lots);
    const pipSizeValue = parseFloat(pipSize);
    const numberOfPips = parseFloat(pips);

    // Calculate pip value in quote currency
    // Each standard lot = 100,000 units
    const pipValueInQuoteCurrency = lotSize * pipSizeValue * 100000;
    const totalInQuoteCurrency = pipValueInQuoteCurrency * numberOfPips;

    // Check if this is a JPY pair (needs conversion to USD)
    if (instrument && instrument.includes("JPY")) {
      try {
        // For XXX/JPY pairs, we need to convert JPY to USD
        // Fetch USD/JPY rate
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=USD/JPY&apikey=${process.env.NEXT_PUBLIC_TWELVE_DATA_KEY}`,
        );
        const data = await response.json();

        if (data.price) {
          const usdJpyRate = parseFloat(data.price);
          // Convert JPY to USD
          const totalInUSD = totalInQuoteCurrency / usdJpyRate;
          return `US$ ${totalInUSD.toFixed(2)}`;
        }
      } catch (error) {
        console.error("Failed to fetch USD/JPY rate:", error);
        // Fallback: use approximate rate of 150
        const totalInUSD = totalInQuoteCurrency / 150;
        return `US$ ${totalInUSD.toFixed(2)} (approx)`;
      }
    }

    // For USD-quoted pairs (EUR/USD, GBP/USD, etc.), no conversion needed
    return `US$ ${totalInQuoteCurrency.toFixed(2)}`;
  }
  return "US$ 0.00";
};

// Forex Margin Calculator
export const calculateMargin = (leverage, lots, price) => {
  if (leverage && lots && price) {
    const leverageRatio = parseFloat(leverage.split(":")[0]);
    const margin =
      (parseFloat(lots) * 100000 * parseFloat(price)) / leverageRatio;
    return `US$ ${margin.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return "US$ 0.00";
};

// Fibonacci Calculator
export const calculateFibonacci = (
  lowPrice,
  highPrice,
  calculationType,
  trendDirection,
) => {
  if (lowPrice && highPrice) {
    const low = parseFloat(lowPrice);
    const high = parseFloat(highPrice);
    const diff = high - low;

    let levels = [];
    if (calculationType === "retracement") {
      if (trendDirection === "UP") {
        levels = [
          { level: "23.6%", price: (high - diff * 0.236).toFixed(1) },
          { level: "38.2%", price: (high - diff * 0.382).toFixed(1) },
          { level: "50%", price: (high - diff * 0.5).toFixed(1) },
          { level: "61.8%", price: (high - diff * 0.618).toFixed(1) },
        ];
      } else {
        levels = [
          { level: "23.6%", price: (low + diff * 0.236).toFixed(1) },
          { level: "38.2%", price: (low + diff * 0.382).toFixed(1) },
          { level: "50%", price: (low + diff * 0.5).toFixed(1) },
          { level: "61.8%", price: (low + diff * 0.618).toFixed(1) },
        ];
      }
    } else {
      levels = [
        { level: "127.2%", price: (high + diff * 0.272).toFixed(1) },
        { level: "161.8%", price: (high + diff * 0.618).toFixed(1) },
        { level: "261.8%", price: (high + diff * 1.618).toFixed(1) },
      ];
    }
    return levels;
  }
  return [];
};

// Pivot Point Calculator
export const calculatePivotPoints = (highPrice, lowPrice, closePrice, type) => {
  if (highPrice && lowPrice && closePrice) {
    const high = parseFloat(highPrice);
    const low = parseFloat(lowPrice);
    const close = parseFloat(closePrice);
    const pivot = (high + low + close) / 3;

    let levels = [];
    if (type === "Standard" || !type) {
      const r1 = 2 * pivot - low;
      const r2 = pivot + (high - low);
      const r3 = high + 2 * (pivot - low);
      const s1 = 2 * pivot - high;
      const s2 = pivot - (high - low);
      const s3 = low - 2 * (high - pivot);

      levels = [
        { level: "Resistance 3", price: r3.toFixed(0) },
        { level: "Resistance 2", price: r2.toFixed(0) },
        { level: "Resistance 1", price: r1.toFixed(0) },
        { level: "Pivot Point", price: pivot.toFixed(0) },
        { level: "Support 1", price: s1.toFixed(0) },
        { level: "Support 2", price: s2.toFixed(0) },
        { level: "Support 3", price: s3.toFixed(0) },
      ];
    }
    return levels;
  }
  return [];
};

// Profit Calculator
export const calculateProfit = (
  tradeType,
  lots,
  openPrice,
  closePrice,
  pipSize,
) => {
  if (tradeType && lots && openPrice && closePrice && pipSize) {
    const open = parseFloat(openPrice);
    const close = parseFloat(closePrice);
    const lotSize = parseFloat(lots);
    const pip = parseFloat(pipSize);

    let priceDiff = tradeType === "Buy" ? close - open : open - close;
    let profitPips = Math.round(priceDiff / pip);
    let profitMoney = profitPips * lotSize * pip * 100000;

    return {
      profitMoney: `US$ ${profitMoney.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      profitPips: profitPips.toString(),
    };
  }
  return {
    profitMoney: "US$ 0.00",
    profitPips: "0",
  };
};
