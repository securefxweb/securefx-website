"use client";

/**
 * Forex Pairs Service - Fetches available forex pairs from Twelve Data API
 */

class ForexPairsService {
  constructor() {
    this.pairs = [];
    this.isLoading = false;
    this.isLoaded = false;
    this.error = null;
    this.apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_KEY || "";
  }

  /**
   * Fetch forex pairs from Twelve Data API
   * @returns {Promise<Array>} Array of forex pairs
   */
  async fetchPairs() {
    if (this.isLoaded) {
      console.log("📦 Using cached forex pairs");
      return this.pairs;
    }

    if (this.isLoading) {
      console.log("⏳ Already fetching forex pairs...");
      return this.pairs;
    }

    if (!this.apiKey) {
      console.error("❌ Twelve Data API key not found");
      this.error = "API key not found";
      return [];
    }

    this.isLoading = true;
    console.log("🔄 Fetching forex pairs from Twelve Data API...");

    try {
      const response = await fetch(
        `https://api.twelvedata.com/forex_pairs?apikey=${this.apiKey}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        this.pairs = data.data;
        this.isLoaded = true;
        console.log(`✅ Loaded ${this.pairs.length} forex pairs`);
        return this.pairs;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("❌ Error fetching forex pairs:", error);
      this.error = error.message;
      return [];
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Get pairs filtered by currency group
   * @param {string} group - Currency group (e.g., "Major", "Minor", "Exotic")
   * @returns {Array} Filtered forex pairs
   */
  getPairsByGroup(group) {
    return this.pairs.filter((pair) => pair.currency_group === group);
  }

  /**
   * Get major pairs only
   * @returns {Array} Major forex pairs
   */
  getMajorPairs() {
    return this.getPairsByGroup("Major");
  }

  /**
   * Get minor pairs only
   * @returns {Array} Minor forex pairs
   */
  getMinorPairs() {
    return this.getPairsByGroup("Minor");
  }

  /**
   * Get all pairs as simple symbol array
   * @returns {Array<string>} Array of symbols
   */
  getSymbols() {
    return this.pairs.map((pair) => pair.symbol);
  }

  /**
   * Get pairs formatted for dropdown
   * @returns {Array<Object>} Array of {value, label} objects
   */
  getDropdownOptions() {
    return this.pairs.map((pair) => ({
      value: pair.symbol,
      label: `${pair.symbol} (${pair.currency_base}/${pair.currency_quote})`,
      group: pair.currency_group,
    }));
  }

  /**
   * Search pairs by symbol or currency name
   * @param {string} query - Search query
   * @returns {Array} Matching pairs
   */
  searchPairs(query) {
    const lowerQuery = query.toLowerCase();
    return this.pairs.filter(
      (pair) =>
        pair.symbol.toLowerCase().includes(lowerQuery) ||
        pair.currency_base.toLowerCase().includes(lowerQuery) ||
        pair.currency_quote.toLowerCase().includes(lowerQuery),
    );
  }
}

// Create singleton instance
const forexPairsService = new ForexPairsService();

export default forexPairsService;
