import { PortfolioProvider } from "@/contexts/PortfolioContext";

import Portfolio from "./Portfolio";
import MobileOnly from "@/utils/MobileOnly";

export default async function Page({ params }) {
  const portfolioKey = (await params).portfolioKey;

  // Bro is not him
  // Also you could add a option to add actual Ads to your app

  // Return App
  return (
    <MobileOnly>
      <PortfolioProvider portfolioKey={portfolioKey}>
        <Portfolio />
      </PortfolioProvider>
    </MobileOnly>
  );
}
