import classes from "./Balance.module.css";

function Balance({ invested, balance, profits }) {
  return (
    <div className="flex justify-around border-b-2 border-purple-200 bg-gray-100 sm:grid sm:grid-cols-balance">
      <div className="flex flex-col justify-center items-center py-3 md:py-8 xl:py-16">
        <div className="font-light text-gray-900 text-base sm:text-xl md:text-2xl xl:text-3xl">
          ${balance}
        </div>
        <div className="text-xs text-gray-500">Available</div>
      </div>
      <div className={`${classes.border} hidden sm:flex`}>+</div>
      <div className="hidden flex-col justify-center items-center sm:flex">
        {invested && (
          <div className="font-light text-gray-900 text-base sm:text-xl md:text-2xl xl:text-3xl">
            ${invested.toFixed(2)}
          </div>
        )}
        <div className="text-xs text-gray-500">Amount Invested</div>
      </div>
      <div className={`${classes.border} hidden sm:flex`}>+</div>
      <div className="flex flex-col justify-center items-center py-3 md:py-8 xl:py-16">
        {profits && (
          <div
            className={`${
              profits >= 0 ? "text-green-500" : "text-red-500"
            } font-light text-base sm:text-xl md:text-2xl xl:text-3xl`}
          >
            ${profits.toFixed(2)}
          </div>
        )}

        <div className="text-xs text-gray-500">P/L</div>
      </div>
      <div className={`${classes.border} hidden sm:flex`}>=</div>
      <div className="flex flex-col justify-center items-center py-3 md:py-8 xl:py-16">
        {invested && balance && profits && (
          <div className="font-light text-gray-900 text-base sm:text-xl md:text-2xl xl:text-3xl">
            ${(profits + invested + balance).toFixed(2)}
          </div>
        )}
        <div className="text-xs text-gray-500">Equity</div>
      </div>
    </div>
  );
}

export default Balance;
