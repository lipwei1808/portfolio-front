import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../utils/requests";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const body = {
      // username required local strategy
      username: emailRef.current.value.toLowerCase(),
      password: passwordRef.current.value,
    };

    try {
      setLoading(true);

      const res = await login(body);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      document.cookie = `token=${data.access_token}`;

      history.push("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-600 h-screen">
      <div className="flex flex-col w-full h-full bg-blue-50 shadow-2xl md:h-auto md:w-auto md:min-w-screen-sm ">
        <div className="flex-grow flex flex-col p-8">
          <h2 className="text-3xl text-center md:mb-8">Login</h2>
          <form
            className="flex flex-col h-full gap-8 pt-12 pb-4 md:gap-0 md:py-0 md:gap-6"
            onSubmit={handleSubmit}
          >
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full">
              <label className="block font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="h-14 w-full pl-3"
                type="email"
                required
                placeholder="Email"
                ref={emailRef}
              />
            </div>
            <div className="w-full">
              <label className="block font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="h-14 w-full pl-3"
                type="password"
                required
                placeholder="Password"
                ref={passwordRef}
              />
            </div>

            <button
              className="mt-auto text-xl md:text-base btn-purple"
              disabled={loading}
              type="submit"
            >
              Login
            </button>
          </form>
          <Link
            className="text-xs text-gray-500 hover:text-black"
            to="/forgot-password"
          >
            Forgot Password
          </Link>
        </div>
        <div className="flex justify-center items-center bg-gray-200 py-6 text-xs text-gray-500">
          No account?&nbsp;
          <Link className="hover:text-black underline" to="/signup">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
