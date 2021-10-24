import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../utils/requests";

function Signup() {
  const emailRef = useRef();
  const confirmEmailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setLoading(true);

      const res = await signup(body);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      history.push("/login");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-600 h-screen">
      <div className="flex flex-col w-full h-full bg-blue-50 shadow-2xl md:h-auto md:w-auto md:min-w-screen-sm ">
        <div className="flex-grow flex flex-col p-8">
          <h2 className="text-3xl text-center mb-8">Sign up</h2>
          <form className="flex flex-col h-full gap-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full">
              <label className="block font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full h-14 rounded shadow"
                type="email"
                required
                placeholder="Email"
                ref={emailRef}
              />
            </div>
            <div className="w-full">
              <label className="block font-bold mb-2" htmlFor="confirmEmail">
                Confirm Email
              </label>
              <input
                className="w-full h-14 rounded shadow"
                type="email"
                required
                placeholder="Confirm Email"
                ref={confirmEmailRef}
              />
            </div>
            <div className="w-full">
              <label className="block font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full h-14 rounded shadow"
                type="password"
                required
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div className="w-full">
              <label className="block font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="w-full h-14 rounded shadow"
                type="password"
                required
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
              />
            </div>
            <button
              className="mt-auto btn-purple"
              disabled={loading}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="bg-gray-200 text-center text-xs py-4">
          Already registered? &nbsp;
          <Link className="text-gray-500 hover:text-black" to="/login">
            Log in!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
