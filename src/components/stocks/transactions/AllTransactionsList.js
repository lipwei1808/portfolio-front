import React, { useEffect, useState } from "react";

import { useReload } from "../../../hooks/useReload";
import { getStocks } from "../../../utils/stock-requests";
import Transaction from "./Transaction";

function AllTransactions({ buttons }) {
  const [stocks, setStocks] = useState();
  const [sort, setSort] = useState("default");
  const [filterBy, setFilterBy] = useState();
  const { loading } = useReload();

  useEffect(() => {
    getStocks()
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setStocks(data);
      })
      .catch(() => {
        console.log("ERROR HELLO");
      });
  }, []);

  function changeSort(sortBy) {
    if (sort === sortBy) return setSort("default");
    setSort(sortBy);
  }

  function filterPortfolioHandler(e) {
    if (e.target.value === "Portfolio") return setFilterBy(null);
    setFilterBy(e.target.value);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-full bg-gray-100">
      <div className="grid grid-cols-5 justify-items-end items-center bg-purple-100 text-gray-600 text-xs px-3 py-3 uppercase sm:text-sm sm:grid-cols-6 md:text-sm lg:text-base lg:py-6 lg:px-10">
        <HeaderName name={"Name"} sort={sort} changeSort={changeSort} />
        <select
          defaultValue={"Portfolio"}
          onChange={filterPortfolioHandler}
          className="hidden bg-purple-100 border-0 sm:block"
        >
          <option>Portfolio</option>
          {buttons &&
            buttons.map((button, i) => {
              return (
                <option key={i} value={button.name}>
                  {button.name}
                </option>
              );
            })}
        </select>
        <HeaderName name={"Price"} sort={sort} changeSort={changeSort} />
        <HeaderName name={"Amount"} sort={sort} changeSort={changeSort} />
        <span className="hidden sm:block">Total Value</span>
        <span className="block sm:hidden">Total</span>
        <div>Delete</div>
      </div>

      {stocks &&
        stocks
          .filter((stock) => {
            if (!filterBy) return stock;
            return stock.portfolio.name === filterBy;
          })
          .sort((a, b) => {
            if (sort === "NameD") return new Date(b.date) - new Date(a.date);
            if (sort === "NameA") return new Date(b.date) - new Date(a.date);
            if (sort === "PriceD") return b.entryPrice - a.entryPrice;
            if (sort === "PriceA") return a.entryPrice - b.entryPrice;
            if (sort === "AmountD") return b.amount - a.amount;
            if (sort === "AmountA") return a.amount - b.amount;
            return 1;
          })
          .map((stock) => {
            return <Transaction key={stock._id} stock={stock} />;
          })}
    </div>
  );
}

export function HeaderName({ sort, changeSort, name }) {
  return (
    <div
      className={`${
        name === "Name" ? "justify-self-start" : ""
      } flex items-center`}
    >
      <div className="mr-2">{name}</div>
      <div className="text-gray-400 text-xs cursor-pointer">
        <div
          className={`${sort === name + "D" ? "text-gray-900 scale-125" : ""}`}
          onClick={() => {
            changeSort(name + "D");
          }}
        >
          &#8593;
        </div>
        <div
          className={`${sort === name + "A" ? "text-gray-900" : ""}`}
          onClick={() => {
            changeSort(name + "A");
          }}
        >
          &#8595;
        </div>
      </div>
    </div>
  );
}

export default AllTransactions;
