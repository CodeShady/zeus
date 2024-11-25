"use client";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import AssetSkeleton from "@/components/ui/skeletons/AssetSkeleton";
import { formatPrice } from "@/utils/formatPrice";

/**
 * @param {object} props
 * @param {'stocks'|'crypto'} props.type - Type of asset
 * @param {object} props.data - A list of assets
 */
export default function Assets({ type, data }) {
  return (
    <div className="mt-10 flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <p className="opacity-50 font-medium capitalize">Your {type}</p>

        <p className="opacity-50">
          <FaCaretDown className="mt-[-3px] mr-1 inline-block" />
          Total Return ($)
        </p>
      </div>

      {/* Check if the asset list is null (not fetched yet) */}
      {data !== null ? (
        <>
          {/* Iterate over each asset */}
          {data.map((asset, index) => (
            <Asset key={index} type={type} asset={asset} />
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 6 }, (_, index) => (
            <AssetSkeleton key={index} />
          ))}
        </>
      )}
    </div>
  );
}

function Asset({ asset, type }) {
  const { ticker, currentPrice, gl, quantity } = asset;

  return (
    <div className="flex gap-4 mb-2 rounded-xl">
      {/* Icon */}
      <div className="border-white/10 border rounded-xl p-2 w-fit aspect-square">
        <img
          alt="Logo"
          className="rounded-md w-8 h-8 max-w-none"
          src={`/icon/${type === "stocks" ? "stocks" : "crypto"}/${ticker}.png`}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col w-full pt-[2px]">
        <div className="flex justify-between">
          <h4 className="font-medium">{ticker}</h4>

          {currentPrice ? (
            <h4 className="font-medium">${formatPrice(currentPrice)}</h4>
          ) : (
            <div className="flex gap-4 mb-2 rounded-xl animate-pulse items-center">
              <div className="w-[80px] h-2.5 rounded-full bg-loading" />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <h4 className="opacity-50">
            {quantity ? (
              <>
                {formatCryptoQuantity(quantity ?? 0)}{" "}
                {type === "stocks" ? "shares" : "coins"}
              </>
            ) : (
              <div className="mt-2 w-[110px] h-2.5 rounded-full bg-loading" />
            )}
          </h4>

          {/* Calculate gain/loss */}
          {currentPrice ? (
            <>
              {gl > 0 && (
                <h4 className="font-medium text-gain">
                  <FaCaretUp className="mt-[-3px] inline-block" />{" "}
                  ${formatPrice(gl)}
                </h4>
              )}
              {gl === 0 && (
                <h4 className="font-medium opacity-50">
                  <FaCaretUp className="mt-[-3px] inline-block" />{" "}
                  ${formatPrice(gl)}
                </h4>
              )}
              {gl < 0 && (
                <h4 className="font-medium text-loss">
                  <FaCaretDown className="mt-[-3px] inline-block" />{" "}
                  ${formatPrice(gl * -1)}
                </h4>
              )}
            </>
          ) : (
            <div className="flex gap-4 mb-2 rounded-xl animate-pulse items-center">
              <div className="w-[65px] h-2.5 rounded-full bg-loading" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatCryptoQuantity(num) {
  // Check if the number has decimal places
  if (num % 1 !== 0) {
    // Round to 6 decimal places and remove trailing zeros
    return parseFloat(num.toFixed(6));
  }
  // If it's a whole number, return it as is
  return num;
}
