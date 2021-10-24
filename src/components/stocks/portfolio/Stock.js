function Stock({ stock }) {
  return (
    <div className="grid grid-cols-5 items-center justify-items-end text-sm px-3 py-4 md:text-base md:grid-cols-6 lg:text-lg lg:px-10 lg:py-6">
      <div className="justify-self-start">
        <div className="font-bold">{stock._id}</div>

        <span className="hidden text-sm italic sm:block">
          {stock.companyName}&nbsp;
        </span>
      </div>
      <div>&#36;{stock.avgPrice.toFixed(2)}</div>
      <div className="hidden md:block">{stock.amount.toFixed(2)}</div>
      <div className="font-bold">&#36;{stock.totalValue.toFixed(2)}</div>
      <div>{(stock.amount * stock.latestPrice).toFixed(2)}</div>
      <div
        className={`${stock.profit >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {stock.profit && stock.profit.toFixed(2)}
      </div>
    </div>
  );
}

export default Stock;
