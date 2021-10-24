function TransactionForm({ form }) {
  return (
    <div className="w-full col-span-3 flex flex-col items-center text-sm 2xl:col-span-2 sm:text-base">
      <div className="w-40 text-center border-b border-gray-300 mb-6 h-auto text-base">
        Trade Details&nbsp;
      </div>
      <form
        className="grid grid-rows-6 w-full sm:grid-cols-3 sm:grid-rows-2 lg:flex lg:justify-center lg:grid-cols-none lg:grid-rows-none"
        ref={form}
      >
        <select
          className=" sm:rounded-tl-xl border-0 lg:rounded-l-xl lg:h-12 lg:h-12"
          name="type"
        >
          <option value="b">Buy</option>
          <option value="s">Sell</option>
        </select>
        <input className="border-0 lg:h-12" type="text" placeholder="Ticker" />
        <input
          className="sm:rounded-tr-xl border-0 lg:rounded-none lg:h-12"
          type="number"
          placeholder="Entry Price"
        />
        <input
          className="sm:rounded-bl-xl border-0 lg:rounded-none lg:h-12"
          type="number"
          placeholder="Amount"
        />
        <input
          className="border-0 lg:h-12"
          type="date"
          placeholder="Date of Purchase"
        />
        <input
          className="sm:rounded-br-xl border-0 lg:rounded-r-xl lg:h-12"
          type="time"
        />
      </form>
    </div>
  );
}

export default TransactionForm;
