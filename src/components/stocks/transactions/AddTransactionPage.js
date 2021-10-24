import { useState } from "react";
import { useReload } from "../../../hooks/useReload";
import Header from "../../Header";
import ErrorModal from "../../modal/ErrorModal";
import AddTransaction from "./AddTransaction";
import AllTransactionsList from "./AllTransactionsList";
import { deletePortfolio } from "../../../utils/stock-requests";

function AddTransactionPage(props) {
  const { loading } = useReload(false);
  const [modalState, setModalState] = useState();
  const [active, setActive] = useState();
  const [buttons, setButtons] = useState();
  const [error, setError] = useState();

  function closeModal() {
    setModalState(false);
  }

  async function deletePortfolioHandler() {
    setError("");
    try {
      const res = await deletePortfolio(active);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      window.location.reload();
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header comp={"Add Transaction"} />
      {modalState && (
        <ErrorModal
          closeModal={closeModal}
          deletePortfolio={deletePortfolioHandler}
          error={error}
        />
      )}

      <AddTransaction
        setModal={setModalState}
        active={active}
        setActive={setActive}
        buttons={buttons}
        setButtons={setButtons}
      />

      <AllTransactionsList buttons={buttons} />
    </div>
  );
}

export default AddTransactionPage;
