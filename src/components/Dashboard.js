import { useReload } from "../hooks/useReload";
import Header from "./Header";

function Dashboard() {
  const { user, loading } = useReload();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header comp={"Dashboard"} />
      <div
        className="flex flex-col justify-evenly items-center h-full bg-black text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl"
        style={{ backgroundImage: "url(/stars.jpg)" }}
      >
        <div className="animate-blinking">
          Hello, {user.username ? user.username : user.email}
        </div>
        <div className="font-extralight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
          Cash balance:{" "}
          {user.balance ? (
            <span className="italic font-normal text-green-400">
              ${user.balance}
            </span>
          ) : (
            "0"
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
