import React, { useState, useEffect, useRef } from "react";

import {
  getPortfolio,
  addStock,
  addPortfolio,
} from "../../../utils/stock-requests";
import TransactionForm from "./TransactionForm";

function AddTransaction({ setModal, active, setActive, buttons, setButtons }) {
  const formRef = useRef();
  const portfolioRef = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    getPortfolio()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setButtons(data);
      });
  }, [setButtons]);

  async function addTransactionHandler(e) {
    setError("");

    try {
      if (!active) throw new Error("No portfolio selected!");
      const inputs = formRef.current.querySelectorAll("input");
      const select = formRef.current.querySelector("select").value;
      const dateTime = inputs[3].value + " " + inputs[4].value;

      let price, amount;
      if (select === "s") {
        price = -Math.abs(inputs[1].value);
        amount = -Math.abs(inputs[2].value);
      } else {
        price = Number(inputs[1].value);
        amount = Number(inputs[2].value);
      }

      const body = {
        portfolio: active,
        type: select,
        ticker: inputs[0].value.toUpperCase(),
        entryPrice: price,
        amount: amount,
        date: dateTime,
      };

      console.log(body);

      const res = await addStock(body);

      if (!res.ok) {
        throw new Error("Please fill check your inputs!");
      }
      window.location.reload();
    } catch (e) {
      setError(e.message);
    }
  }

  async function addPortfolioHandler() {
    try {
      const res = await addPortfolio(portfolioRef.current.value);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      window.location.reload();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-addTransaction gap-y-6 justify-items-center items-center bg-gray-100 pt-5 relative sm:py-5 sm:px-2 2xl:grid-rows-1">
        {error && (
          <div className="absolute w-screen h-full flex items-center justify-center">
            <span
              className={`${
                error ? "inline-block" : null
              } text-center bg-red-600 opacity-80 text-white rounded-md px-4 py-2 z-10 mr-3 `}
            >
              {error}
              <span
                onClick={() => setError(null)}
                className="ml-3 text-md text-gray-300 hover:text-white cursor-pointer"
              >
                X
              </span>
            </span>
          </div>
        )}
        <div className="col-span-3 flex flex-col w-full 2xl:col-span-1">
          <div className="flex flex-col items-center sm:flex-row sm:justify-evenly">
            <div className="w-40 text-center border-b border-gray-300 mb-3 sm:mb-6">
              Select Portfolio&nbsp;
            </div>
            <div className="relative mb-3 sm:mb-0">
              <input
                className="h-8 border-0 rounded-xl"
                type="text"
                placeholder="Add Portfolio"
                ref={portfolioRef}
              />
              <span
                onClick={addPortfolioHandler}
                className="absolute right-1 top-1 cursor-pointer text-purple-300 hover:text-purple-900"
              >
                &rarr;
              </span>
            </div>
          </div>
          <div className="flex w-full justify-around">
            {buttons &&
              buttons.map((button, i) => {
                return (
                  <PortfolioButton
                    active={active}
                    setActive={setActive}
                    key={i}
                    name={button.name}
                    id={button._id}
                    setModal={setModal}
                  />
                );
              })}
          </div>
        </div>
        <TransactionForm form={formRef} />
      </div>
      <div className="bg-gray-100 text-center sm:pb-3">
        <button
          className="w-full h-full sm:h-auto sm:w-auto px-4 py-2 bg-green-300 sm:rounded-lg"
          onClick={addTransactionHandler}
        >
          Add Transaction
        </button>
      </div>
    </>
  );
}

function PortfolioButton({ active, setActive, name, id, setModal }) {
  function removePortfolio() {
    setModal(true);
  }

  return (
    <div className="relative">
      <button
        className={`${
          active === id
            ? "bg-purple-700 text-white transform scale-125 shadow-lg"
            : "bg-white"
        } text-sm sm:text-base w-24 text-center py-3 rounded-xl h-12 sm:w-32 md:w-40 2xl:w-24`}
        onClick={() => (active === id ? setActive(null) : setActive(id))}
      >
        {name}
      </button>
      <span
        onClick={removePortfolio}
        className={`absolute right-deletePortfolio text-sm text-gray-400 hover:text-white cursor-pointer ${
          active === id ? "inline-block" : "hidden"
        }`}
      >
        X
      </span>
    </div>
  );
}

export default AddTransaction;
