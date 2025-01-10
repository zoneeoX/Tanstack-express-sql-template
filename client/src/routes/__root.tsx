import * as React from "react";
import {
  createRootRoute,
  // createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthContext } from "../context/AuthContext";
import {
  useIsAdmin,
  useIsAuthUser,
  useIsManager,
  useLogout,
} from "../react-query/queries";
import { refreshAccessToken } from "../api/api";
// import { useAuth } from "../context/AuthContext";

// type RouterContext = {
//   authentication: ReturnType<typeof useAuth>;
// };

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isLogged, username, isLoading } = useAuthContext();
  // const { isAuth } = useIsAuthUser();

  const { mutateAsync: isAuth } = useIsAuthUser();
  const { mutateAsync: isAdmin } = useIsAdmin();
  const { mutateAsync: isManager } = useIsManager();
  const { mutateAsync: logoutUser } = useLogout();

  // function get() {
  //   isAuth();
  // }

  React.useEffect(() => {
    refreshAccessToken();
  }, []);

  const amIJwt = async () => {
    try {
      const response = await isAuth();
      console.log(response);
      alert(response.data);
    } catch (error) {
      alert("error, check console bro");
    }
  };

  const amIAdmin = async () => {
    try {
      const response = await isAdmin();
      console.log(response);
      alert(response.data);
    } catch (error) {
      alert("You are not admin bro 🤣");
    }
  };

  const amIManager = async () => {
    try {
      const response = await isManager();
      alert(response.data);
    } catch (error) {
      alert("You are not manager bro 🤣");
    }
  };

  const logoutBruh = async () => {
    try {
      const response = await logoutUser();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-1 p-4 items-center justify-between h-[10vh] bg-slate-800 text-white">
        <div className="flex flex-col gap-2">
          <h1>
            {isLogged ? (
              <div className="flex flex-row gap-1">
                <span>Logged in as </span>{" "}
                <p className="bg-red-400 px-2">{username}</p>
                <button
                  className="px-4 py-2 rounded-xl bg-red-600 text-white"
                  onClick={logoutBruh}
                >
                  logout
                </button>
              </div>
            ) : (
              "Zonii's SQL + Express + Tanstack Template"
            )}
          </h1>
          {isLogged && (
            <div className="flex flex-row gap-6">
              <button
                className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gradient-to-r from-purple-500 to-orange-400 transition hover:text-white"
                onClick={amIJwt}
              >
                Check JWT 😀
              </button>
              <button
                onClick={amIManager}
                className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gradient-to-r from-purple-500 to-orange-400 transition hover:text-white"
              >
                Are you a manager? 😎
              </button>{" "}
              <button
                onClick={amIAdmin}
                className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gradient-to-r from-purple-500 to-orange-400 transition hover:text-white"
              >
                Are you an admin? 👨‍🦰
              </button>
            </div>
          )}
        </div>
        <section className="flex-row gap-6 flex">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/todo/create" className="[&.active]:font-bold">
            Create
          </Link>
          {isLogged ? (
            ""
          ) : (
            <>
              <Link to="/authentication/login" className="[&.active]:font-bold">
                Login
              </Link>
              <Link
                to="/authentication/register"
                className="[&.active]:font-bold"
              >
                Register
              </Link>
            </>
          )}
        </section>
      </div>

      <main className="p-4">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </React.Fragment>
  );
}
