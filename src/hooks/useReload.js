import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { refreshToken } from "../utils/requests";

export function useReload() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  async function refreshTokenHandler() {
    console.log("Refreshing token");
    try {
      const res = await refreshToken();
      if (!res.ok) {
        throw Error();
      }
      const data = await res.json();
      document.cookie = `token=${data.access_token}`;
      setUser(data.user);
      setLoading(false);
      console.log("refreshed!");
    } catch (e) {
      console.log("error");
      history.push("/login");
    }
  }

  useEffect(() => {
    console.log("page reload");
    refreshTokenHandler();

    const interval = setInterval(() => {
      refreshTokenHandler();
    }, 1800000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    loading,
  };
}
