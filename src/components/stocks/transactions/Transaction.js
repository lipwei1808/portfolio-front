import React, { useEffect, useState } from "react";

import { getQuote, removeStock } from "../../../utils/stock-requests";

function Transaction({ stock }) {
  const [stockData, setStockData] = useState();
  const {
    _id: stockId,
    ticker,
    entryPrice,
    amount,
    date,
    type,
    portfolio,
  } = stock;

  useEffect(() => {
    getQuote(ticker)
      .then((res) => {
        if (!res.ok) throw new Error("rip");
        return res.json();
      })
      .then((data) => {
        setStockData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [ticker]);

  async function removeTransactionHandler(stockId) {
    try {
      const res = await removeStock(stockId);

      if (!res) throw new Error("Error removing stock");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="grid grid-cols-5 text-sm items-center justify-items-end px-3 py-2 sm:grid-cols-6 md:text-md lg:text-lg lg:px-10 lg:py-6">
      <div className="justify-self-start">
        <div className="font-bold flex items-center">
          {ticker}
          <div className="ml-2 block text-sm italic font-bold lg:hidden">
            ({type.toUpperCase()})
          </div>
        </div>
        <div className="hidden text-sm italic underline md:block">{date}</div>
        {stockData && (
          <span className="hidden text-sm italic lg:block">
            {stockData.companyName}&nbsp;
          </span>
        )}
      </div>
      <div className="hidden sm:block">{portfolio.name.toUpperCase()}</div>
      <div>&#36;{Math.abs(entryPrice.toFixed(2))}</div>
      <div className="">
        {Math.abs(amount.toFixed(2))}
        <div className="hidden text-sm italic font-bold lg:block">
          ({type.toUpperCase() === "S" ? "SELL" : "BUY"})
        </div>
      </div>

      <div className="font-bold">
        &#36;{Math.abs((entryPrice * amount).toFixed(2))}
      </div>
      <button
        onClick={() => removeTransactionHandler(stockId)}
        className="h-10 w-10 border-2 border-gray-300 rounded-lg bg-white text-red-500 hover:bg-red-500 hover:text-white"
      >
        X
      </button>
    </div>
  );
}

export default Transaction;
