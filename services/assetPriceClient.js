"use server";

export async function getAssetPrice(ticker, assetType, currency="USD") {
  const API_KEY = process.env.TWELVEDATA_API_KEY;
  
  let API_ENDPOINT;

  // Find what the API endpoint should look like depending on stock/crypto asset
  if (assetType === "crypto") {
    API_ENDPOINT = `https://api.twelvedata.com/price?symbol=${ticker}/${currency}&apikey=${API_KEY}`;
  } else if (assetType === "stocks") {
    API_ENDPOINT = `https://api.twelvedata.com/price?symbol=${ticker}&apikey=${API_KEY}`;
  } else {
    throw new Error(`getAssetPrice() requires an assetType to work properly`);
  }

  // Fetch from API
  const response = await fetch(API_ENDPOINT, {
    next: { revalidate: 900 } /* TODO: change to 900 (15 min) */
  });

  // Check if the response is okay
  if (!response.ok) {
    throw new Error(`Failed to fetch price for ${ticker}: ${response.statusText}`);
  }

  // Parse response
  const data = await response.json();

  // Return current price
  return Number(data.price);
}