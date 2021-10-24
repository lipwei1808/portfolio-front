import React, { useState, useEffect, useRef } from "react";

import { getPortfolio, getDistribution } from "../../../utils/stock-requests";
import PieChart from "../../charts/Pie";

function PortfolioTitle({ active, setActive }) {
  const [buttons, setButtons] = useState();
  const [distribution, setDistribution] = useState();
  const pieRef = useRef();

  useEffect(() => {
    getDistribution()
      .then((res) => res.json())
      .then((data) => {
        setDistribution(data);
      });
  }, []);

  useEffect(() => {
    getPortfolio()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setButtons(data);
      });
  }, [setButtons]);

  return (
    <div className="flex flex-col flex-col-reverse justify-items-center items-center border-b bg-gray-100 py-8 lg:grid lg:grid-rows-2 lg:grid-cols-2">
      <div className="hidden text-3xl text-purple-700 font-light lg:block">
        Portfolio Distribution
      </div>
      <div className="lg:col-start-2 lg:row-span-2">
        {distribution && (
          <PieChart distribution={distribution} pieRef={pieRef} />
        )}
      </div>

      <div className="flex flex-col mb-6 items-center w-full lg:m-0">
        <div className="w-40 text-center border-b border-gray-300">
          Select Portfolio&nbsp;
        </div>
        <div className="flex mt-4 w-full justify-around">
          {buttons &&
            buttons.map((button, i) => {
              return (
                <PortfolioButton
                  active={active}
                  setActive={setActive}
                  key={i}
                  name={button.name}
                  id={button._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

function PortfolioButton({ active, setActive, name, id }) {
  function clickHandler() {
    if (active === id) return setActive(null);
    setActive(id);
  }

  return (
    <button
      className={`${
        active === id
          ? "bg-purple-700 text-white transform scale-125 shadow-lg"
          : "bg-white"
      } rounded-xl w-24 text-center text-sm py-3 h-12 sm:text-base sm:w-40 lg:w-24`}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}

export default PortfolioTitle;
