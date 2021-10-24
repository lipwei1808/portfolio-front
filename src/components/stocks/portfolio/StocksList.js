import React, { useEffect, useState } from "react";

import { getConsolidatedStocks, getQuote } from "../../../utils/stock-requests";
import Stock from "./Stock";
import { HeaderName } from "../transactions/AllTransactionsList";

function StocksList({ active, setInvested, setProfits }) {
  const [stocks, setStocks] = useState([]);
  const [sort, setSort] = useState();

  useEffect(() => {
    getConsolidatedStocks(active)
      .then((res) => res.json())
      .then((data) => {
        const invested = data.reduce((prev, curr) => prev + curr.totalValue, 0);
        setInvested(invested);
        const allPromises = [];
        for (let stock of data) {
          const newStock = (async function test() {
            const res = await getQuote(stock._id);
            const data = await res.json();
            const profit = stock.amount * data.latestPrice - stock.totalValue;
            const newStock = {
              ...stock,
              latestPrice: data.latestPrice,
              profit: profit,
              companyName: data.companyName,
            };
            return newStock;
          })();
          allPromises.push(newStock);
        }
        return Promise.all(allPromises);
      })
      .then((values) => {
        const totalProfits = values.reduce((p, c) => p + c.profit, 0);
        setProfits(totalProfits);
        console.log(values);
        setStocks(values);
      });
  }, [active, setInvested, setProfits]);

  function changeSort(sortBy) {
    if (sort === sortBy) return setSort("default");
    setSort(sortBy);
  }

  return (
    <div className="h-full bg-gray-100">
      <div className="grid grid-cols-5 justify-items-end items-center bg-purple-100 text-gray-600 text-xs px-3 py-3 uppercase sm:text-sm md:grid-cols-6 md:text-sm lg:text-base lg:px-10 lg:py-6">
        <div className="justify-self-start">Name</div>
        <HeaderName name={"Price"} sort={sort} changeSort={changeSort} />
        <div className="hidden md:block">Amount</div>
        <HeaderName name={"Cost"} sort={sort} changeSort={changeSort} />
        <div>Value</div>
        <HeaderName name={"Profit"} sort={sort} changeSort={changeSort} />
      </div>
      {stocks.length &&
        stocks
          .sort((a, b) => {
            if (sort === "PriceD") return b.avgPrice - a.avgPrice;
            if (sort === "PriceA") return a.avgPrice - b.avgPrice;
            if (sort === "CostD") return b.totalValue - a.totalValue;
            if (sort === "CostA") return a.totalValue - b.totalValue;
            if (sort === "ProfitD") return b.profit - a.profit;
            if (sort === "ProfitA") return a.profit - b.profit;
            return 1;
          })
          .map((stock) => <Stock key={stock._id} stock={stock} />)}
    </div>
  );
}

export default StocksList;
