"use server";

// Imports
import { client } from "./contentfulClient";

// Server Action Functions
export async function apiGetPortfolio(key="") {

  // Lookup item in the contentful database
  const response = await client.getEntries({
    content_type: "portfolio",
    "fields.key": key,
  });

  // If the response wasn't empty, return it!
  if (response.items.length > 0)
    return response.items[0].fields;
  
  // No portfolio found
  return [];
}

export async function apiGetAds() {
  // Fetch all ads in the database
  const response = await client.getEntries({
    content_type: "ads",
  });

  return response.items;
}