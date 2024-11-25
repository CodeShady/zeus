"use client";

import { getAssetPrice } from "@/services/assetPriceClient";
import { apiGetPortfolio } from "@/services/serverActions";
import { useState, useEffect, createContext, useContext } from "react";

// Create context
const PortfolioContext = createContext();

// Create provider
export const PortfolioProvider = ({ portfolioKey, children }) => {
  const [calculatedAssetStats, setCalculatedAssetStats] = useState(false);
  const [portfolio, setPortfolio] = useState({
    fullName: null, // Portfolio owner full name (string)
    value: null, // Portfolio value (int)
    initValue: null, // Initial portfolio value (int)
    gl: null, // Portfolio gain/loss (int)
    glPercent: null, // Portfolio gain/loss percent (int)
    uninvestedCash: -1,
    stocks: null, // Array[]
    crypto: null, // Array[]
    notifications: [],
  });

  // Loop over stocks & assets and add various information to them
  useEffect(() => {
    const updateAssetStats = async () => {
      console.log("Updating assets...");

      // Update crypto & stock data
      const updatedCrypto = await calculateAssetStats(
        portfolio.crypto,
        "crypto"
      );
      const updatedStocks = await calculateAssetStats(
        portfolio.stocks,
        "stocks"
      );

      // Calculate total initial investment and gain/loss for the portfolio
      const totalInitValue = [...updatedCrypto, ...updatedStocks].reduce(
        (acc, asset) => acc + asset.initValue,
        0
      );
      const totalGL = [...updatedCrypto, ...updatedStocks].reduce(
        (acc, asset) => acc + asset.gl,
        0
      );
      const totalValue = totalInitValue + totalGL;
      const totalGLPercent =
        totalInitValue === 0 ? 0 : (totalGL / totalInitValue) * 100;

      // Update portfolio state
      setPortfolio((prev) => ({
        ...prev,
        value: totalValue,
        initValue: totalInitValue,
        gl: totalGL,
        glPercent: totalGLPercent,
        crypto: updatedCrypto,
        stocks: updatedStocks,
      }));

      // Update flag so we don't do this again
      setCalculatedAssetStats(true);
    };

    // Don't run if we've already done this before!
    if (calculatedAssetStats) return;

    // Only run if the data is populated!
    if (portfolio.stocks?.length > 0 || portfolio.crypto?.length > 0)
      updateAssetStats();
    
  }, [portfolio.stocks, portfolio.crypto]);

  // Fetch portfolio data
  useEffect(() => {
    async function fetchPortfolio() {
      // Fetch
      const data = await apiGetPortfolio(portfolioKey);

      // Update
      setPortfolio((prev) => ({
        ...prev,
        fullName: data.fullName,
        stocks: data.stocks,
        crypto: data.crypto,
        uninvestedCash: data.uninvestedCash,
        notifications: data.notifications,
      }));
    }
    fetchPortfolio();
  }, []);

  const calculateAssetStats = async (assetObject, assetType) => {
    const updatedAsset = await Promise.all(
      assetObject.map(async (coin) => {
        const { quantity, initValue, gl, glPercent, currentPrice } =
          await getAssetStats(coin, assetType);
        return {
          ...coin,
          currentPrice,
          quantity,
          initValue,
          gl,
          glPercent,
        };
      })
    );
    return updatedAsset;
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

/**
 * Find & calculate stats about an asset using an asset object
 *
 * @param {Array[]} asset - Asset object
 * @param {'stocks'|'crypto'} - Asset type
 */
async function getAssetStats(asset, assetType) {
  let currentPrice = await getAssetPrice(asset.ticker, assetType);
  let assetGL = 0; // Gain/loss for the asset
  let assetQuantity = 0; // Quantity (Shares/Coins)
  let assetInitValue = 0; // Initial purchase value if asset price didn't change

  // Loop over each item in the order
  asset.orders.map(({ quantity, buy_price }) => {
    // Add stats to their respective variables
    assetGL += (currentPrice - buy_price) * quantity;
    assetInitValue += buy_price * quantity;
    assetQuantity += quantity;
  });

  // Calculate gain/loss percentage
  let assetGLPercent =
    assetInitValue === 0 ? 0 : (assetGL / assetInitValue) * 100;

  return {
    quantity: assetQuantity,
    initValue: assetInitValue,
    gl: assetGL,
    glPercent: assetGLPercent,
    currentPrice,
  };
}

// Export
export const usePortfolio = () => useContext(PortfolioContext);
