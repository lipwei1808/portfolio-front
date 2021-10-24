import React, { useState } from "react";

import { useReload } from "../../../hooks/useReload";
import Header from "../../Header";
import Balance from "./Balance";
import PortfolioTitle from "./PortfolioTitle";
import StocksList from "./StocksList";

function PortfolioPage(props) {
  const { user, loading } = useReload();
  const [active, setActive] = useState();
  const [invested, setInvested] = useState();
  const [profits, setProfits] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header comp={"Portfolio"} />
      <PortfolioTitle active={active} setActive={setActive} />
      <Balance invested={invested} balance={user.balance} profits={profits} />
      <StocksList
        active={active}
        setInvested={setInvested}
        setProfits={setProfits}
      />
    </div>
  );
}

export default PortfolioPage;
