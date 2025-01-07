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
import { useIsAuthUser } from "../react-query/queries";
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

  function get() {
    isAuth();
  }

  return (
    <React.Fragment>
      <div className="flex flex-1 p-4 items-center justify-between h-[10vh] bg-slate-800 text-white">
        <div className="flex flex-col gap-2">
          <h1>
            {isLogged ? (
              <div className="flex flex-row gap-1">
                <span>Logged in as </span>{" "}
                <p className="bg-red-400 px-2">{username}</p>
              </div>
            ) : (
              "Zonii's SQL + Express + Tanstack Template"
            )}
          </h1>
          {isLogged && (
            <button
              className="bg-slate-700 hover:bg-slate-600 px-2 py-1"
              onClick={get}
            >
              Check JWT :D
            </button>
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
