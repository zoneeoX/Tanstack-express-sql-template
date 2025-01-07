import * as React from "react";
import {
  createRootRoute,
  // createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useAuth } from "../context/AuthContext";

// type RouterContext = {
//   authentication: ReturnType<typeof useAuth>;
// };

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex flex-1 p-4 items-center justify-between h-[10vh] bg-slate-800 text-white">
        <h1>Zonii's SQL + Express + Tanstack Template</h1>
        <section className="flex-row gap-6 flex">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/todo/create" className="[&.active]:font-bold">
            Create
          </Link>
          <Link to="/authentication/login" className="[&.active]:font-bold">
            Login
          </Link>
          <Link to="/authentication/register" className="[&.active]:font-bold">
            Register
          </Link>
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
