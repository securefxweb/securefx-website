/**
 * Forex utility functions for currency pair handling
 */

/**
 * Get pip size for a given forex pair
 * @param {string} instrument - Forex pair (e.g., "EUR/USD")
 * @returns {number} Pip size
 */
export const getPipSize = (instrument) => {
  // JPY pairs use 2 decimal places (0.01 pip)
  // All other pairs use 4 decimal places (0.0001 pip)
  if (instrument && instrument.includes("JPY")) {
    return 0.01;
  }
  return 0.0001;
};

/**
 * List of supported forex instruments
 */
export const FOREX_INSTRUMENTS = [
  // Major pairs
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "AUD/USD",
  "USD/CAD",
  "USD/CHF",
  "NZD/USD",

  // JPY crosses
  "EUR/JPY",
  "GBP/JPY",
  "AUD/JPY",
  "CAD/JPY",
  "CHF/JPY",
  "NZD/JPY",

  // EUR crosses
  "EUR/GBP",
  "EUR/AUD",
  "EUR/CAD",
  "EUR/CHF",
  "EUR/NZD",

  // GBP crosses
  "GBP/AUD",
  "GBP/CAD",
  "GBP/CHF",
  "GBP/NZD",

  // Other crosses
  "AUD/CAD",
  "AUD/CHF",
  "AUD/NZD",
  "CAD/CHF",
  "NZD/CAD",
  "NZD/CHF",
];

/**
 * Format price based on instrument type
 * @param {number} price - Price to format
 * @param {string} instrument - Forex pair
 * @returns {string} Formatted price
 */
export const formatPrice = (price, instrument) => {
  if (!price) return "0.00000";

  // JPY pairs use 3 decimal places
  if (instrument.includes("JPY")) {
    return parseFloat(price).toFixed(3);
  }

  // Most pairs use 5 decimal places
  return parseFloat(price).toFixed(5);
};

/**
 * Get currency names for display
 */
export const CURRENCIES = [
  "US Dollar",
  "Euro",
  "British Pound",
  "Japanese Yen",
  "Australian Dollar",
  "Canadian Dollar",
  "Swiss Franc",
  "New Zealand Dollar",
];
