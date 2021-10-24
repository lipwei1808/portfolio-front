import { useEffect, useState } from "react";
import classes from "./BigButton.module.css";

function BigButton({ type, setChange, callEdit, change }) {
  const [input, setInput] = useState("");
  const [valid, setValid] = useState();

  useEffect(() => {
    input ? setValid(true) : setValid(false);
  }, [input]);

  function changeHandler(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function clickHandler() {
    if (!input) return;

    const changeAmount = type === "+" ? input : "-" + input;
    setInput("");
    if (changeAmount === change) callEdit();
    if (input) setChange(changeAmount);
  }

  return (
    <div className={classes.container}>
      <div
        className={`${classes.contentFront} ${
          type === "+" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {type}
      </div>
      <div
        className={`${classes.contentBack} ${
          type === "+" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div
          className={`${valid ? classes.topupReady : null} ${
            valid
              ? type === "+"
                ? "bg-green-400"
                : "bg-red-400"
              : "bg-transparent"
          } ${valid ? "hover:animate-hop cursor-pointer" : null} `}
          onClick={clickHandler}
        >
          {type === "+" ? "Top up" : "Withdraw"}
        </div>
        <input
          className={classes.inputField}
          type="number"
          placeholder="Enter amount..."
          onChange={changeHandler}
          value={input}
        />
      </div>
    </div>
  );
}

export default BigButton;
