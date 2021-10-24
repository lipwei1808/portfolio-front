import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { logout } from "../utils/requests";

function Header(props) {
  const [loading, setLoading] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const history = useHistory();

  async function handleClick(e) {
    setLoading(true);
    e.preventDefault();
    await logout();
    history.push("/login");
  }

  return (
    <div className="grid grid-cols-2 items-center w-full bg-gray-900 sm:grid-rows-none sm:grid-cols-none sm:flex px-6 py-3 sm:px-6 sm:px-2 lg:px-10 ">
      <div className="hidden flex-grow text-3xl text-white lg:inline-block">
        {props.comp}
      </div>
      <div
        className={`${
          openNav ? "block" : "hidden"
        } row-start-2 col-span-2 sm:block mr-auto`}
      >
        <Link
          to="/"
          className="block py-2 mr-3 text-gray-500 hover:animate-hop hover:text-white sm:inline-block"
        >
          Dashboard
        </Link>
        <Link
          className="block py-2 mr-3 text-gray-500 hover:animate-hop hover:text-white sm:inline-block"
          to="/edit-profile"
        >
          Update profile
        </Link>
        <Link
          className="block py-2 mr-3 text-gray-500 hover:animate-hop hover:text-white sm:inline-block"
          to="/edit-balance"
        >
          Edit balance
        </Link>
        <Link
          className="block py-2 mr-3 text-gray-500 hover:animate-hop hover:text-white sm:inline-block"
          to="/add-transaction"
        >
          Transactions
        </Link>

        <Link
          className="block py-2 mr-3 text-gray-500 hover:animate-hop hover:text-white sm:inline-block"
          to="/portfolio"
        >
          Portfolio
        </Link>
      </div>
      <div
        onClick={() => {
          console.log(openNav);
          setOpenNav(!openNav);
        }}
        className="mr-auto text-white text-4xl sm:hidden"
      >
        &equiv;
      </div>
      <div className="flex justify-end">
        <button
          className=" btn-purple"
          disabled={loading}
          onClick={handleClick}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Header;
