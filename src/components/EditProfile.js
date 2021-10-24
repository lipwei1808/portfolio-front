import { useState, useEffect } from "react";
import Header from "./Header";
import { editProfile } from "../utils/requests";
import { useReload } from "../hooks/useReload";

function EditProfile() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [message, setMessage] = useState();
  const [valid, setValid] = useState(false);

  const { user, loading } = useReload();

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  useEffect(() => {
    if (password && password === confirm) return setValid(true);
    if (name && user?.username !== name) return setValid(true);
    setValid(false);
  }, [name, password, confirm, user]);

  function usernameChangeHandler(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function passwordChangeHandler(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function confirmChangeHandler(e) {
    e.preventDefault();
    setConfirm(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    const body = {};

    if (password) body["password"] = password;
    if (name) body["username"] = name;
    setPassword("");
    setConfirm("");
    console.log(body);
    const res = await editProfile(body);
    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
    } else {
      setMessage("Profile updated!");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header comp={"Update Profile"} />
      <div
        className="flex justify-center items-center h-full"
        style={{ backgroundImage: "url(/stars.jpg)" }}
      >
        <div className="flex flex-col w-full h-full bg-blue-50 p-8 md:rounded-lg md:w-auto md:h-auto md:min-w-screen-sm">
          <div className="text-3xl text-center mb-8">Update Profile</div>
          <form className="h-full flex flex-col gap-6" onSubmit={handleSubmit}>
            {message && <p>{message}</p>}
            <div className="font-bold">
              Email:{" "}
              <span className="font-normal text-gray-400">{user.email}</span>
            </div>

            <div>
              <label className="block font-bold mb-2">Username</label>
              <input
                className="h-14 w-full pl-3"
                type="text"
                placeholder="Leave blank to not update"
                defaultValue={user.username ? user.username : ""}
                onChange={usernameChangeHandler}
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Password</label>
              <input
                className="h-14 w-full pl-3"
                type="password"
                placeholder="Leave blank to not update"
                onChange={passwordChangeHandler}
                value={password}
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Confirm Password</label>
              <input
                className="h-14 w-full pl-3"
                type="password"
                placeholder="Leave blank to not update"
                onChange={confirmChangeHandler}
                value={confirm}
              />
            </div>
            <button
              disabled={!valid}
              className={`${
                valid
                  ? "hover:scale-105 hover:bg-purple-600"
                  : " cursor-not-allowed"
              } mt-auto bg-purple-300 rounded-lg py-2 px-4 transform duration-500 md:mt-0`}
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
