import { useState, useEffect } from "react";
import Header from "../Header";
import BigButton from "./BigButton";
import { editBalance } from "../../utils/requests";
import { useReload } from "../../hooks/useReload";
import { getBalance } from "../../utils/requests";

function EditBalance(props) {
  const { user, loading } = useReload();

  const [change, setChange] = useState(null);
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    let timer;
    if (status) {
      timer = setTimeout(() => {
        setStatus(null);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (user) setBalance(user.balance);
  }, [user]);

  useEffect(() => {
    if (change === null) return;
    else callEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  async function callEdit() {
    await editBalance({ balance: Number(change) });
    if (Number(change) > 0) setStatus("+");
    else setStatus("-");

    const res = await getBalance();
    const data = await res.json();
    setBalance(data);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header comp={"Edit Balance"} />
      <div
        className="h-full flex flex-col"
        style={{ backgroundImage: "url(/stars.jpg)" }}
      >
        <div className="flex justify-center md:py-10">
          {balance && (
            <div
              className={`${
                status === "+"
                  ? "border-green-400"
                  : status === "-"
                  ? "border-red-400"
                  : null
              } border-8 border-transparent bg-white px-6 py-3 w-full md:rounded-xl md:w-auto`}
            >
              Balance: ${balance.toFixed(2)}
            </div>
          )}
        </div>
        <div className="flex-grow flex flex-col justify-around items-center sm:flex-row">
          <BigButton
            type={"+"}
            setChange={setChange}
            callEdit={callEdit}
            change={change}
            status={status}
          />
          <BigButton
            type={"-"}
            setChange={setChange}
            callEdit={callEdit}
            change={change}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}

export default EditBalance;
