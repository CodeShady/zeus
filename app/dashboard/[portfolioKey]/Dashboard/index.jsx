"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaCaretUp, FaCaretDown, FaRegHandPointUp } from "react-icons/fa";

// Misc Imports
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";
import Card from "@/components/ui/Card";
import { apiGetAds, apiGetPortfolio } from "@/services/serverActions";

import Assets from "./Assets";
import { usePortfolio } from "@/contexts/PortfolioContext";

export default function Dashboard() {
  const { portfolio, setPortfolioData } = usePortfolio();
  const [adsData, setAdsData] = useState([]);

  // Load ads data
  useEffect(() => {
    async function fetchAds() {
      const data = await apiGetAds();
      setAdsData(data);
    }
    fetchAds();
  }, [portfolio]);

  // Return App
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {/* Header */}
      <div>
        <p className="opacity-50 font-medium">Total Balance</p>
        <h2 className="text-4xl font-medium">
          {portfolio.value ? (
            <>${formatPrice(portfolio.value)}</>
          ) : (
            <div className="animate-pulse">
              <span className="text-loading">$0.00</span>
            </div>
          )}
        </h2>

        {/* Gain / Loss Tag */}
        <PortfolioGLTag gl={portfolio.gl} glPercent={portfolio.glPercent} />
      </div>

      {/* Uninvested Cash */}
      <div className="mt-5">
        {/* Check if we're loading */}
        {portfolio.uninvestedCash === -1 ? (
          <div className="animate-pulse">
            <div className="w-full h-[57px] rounded-xl bg-loading" />
          </div>
        ) : (
          <Card className="flex gap-4 group">
            <div className="w-full flex justify-between">
              <h4 className="opacity-50">Uninvested Cash</h4>
              <h4 className="">${formatPrice(portfolio.uninvestedCash)}</h4>
            </div>
          </Card>
        )}
      </div>

      {/* Alerts / Ads */}
      <div className="mt-5">
        {adsData.length > 0 ? (
          <>
            {adsData.map(({ fields: { title, description, poster } }) => (
              <Card
                key={title}
                className="h-[195px] flex gap-4 hover:cursor-pointer"
              >
                <img
                  className="w-1/4 min-h-40 h-auto rounded-md object-cover object-left-top"
                  src={poster.fields.file.url}
                />

                <div className="w-full flex flex-col justify-between">
                  <h4>{title}</h4>
                  <p className="opacity-75">{description}</p>

                  {/* <div className="w-full flex justify-end">
                    <Button className="mt-2 w-fit">
                      <FaRegHandPointUp />
                    </Button>
                  </div> */}
                </div>
              </Card>
            ))}
          </>
        ) : (
          <div className="animate-pulse">
            <div className="w-full h-[195px] rounded-xl bg-loading" />
          </div>
        )}
      </div>

      {/* Assets */}
      <Assets type="crypto" data={portfolio.crypto} />
      <Assets type="stocks" data={portfolio.stocks} />
    </motion.div>
  );
}

function PortfolioGLTag({ gl, glPercent }) {
  return (
    <>
      {gl && glPercent ? (
        <>
          {gl > 0 && (
            <Tag className="mt-2 bg-accent">
              <h4 className="font-medium text-black">
                <FaCaretUp className="mt-[-3px] inline-block" /> $
                {formatPrice(gl)} ({formatPrice(glPercent)}%)
              </h4>
            </Tag>
          )}
          {gl === 0 && (
            <Tag className="mt-2 bg-loading">
              <h4 className="font-medium text-white">
                <FaCaretUp className="mt-[-3px] inline-block" /> $0.00 (0.00%)
              </h4>
            </Tag>
          )}
          {gl < 0 && (
            <Tag className="mt-2 bg-loss">
              <h4 className="font-medium text-white">
                <FaCaretDown className="mt-[-3px] inline-block" /> $
                {formatPrice(gl * -1)} ({formatPrice(glPercent * -1)}%)
              </h4>
            </Tag>
          )}
        </>
      ) : (
        <div className="animate-pulse mt-2">
          <div className="w-[142px] h-[32px] rounded-full bg-loading" />
        </div>
      )}
    </>
  );
}
