import * as React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex flex-1 p-4 items-center justify-between h-[10vh] bg-slate-800 text-white">
        <h1>Zonii Tanstack Router Template</h1>
        <section className="flex-row gap-6 flex">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/settings/profile" className="[&.active]:font-bold">
            Profile
          </Link>
          <Link to="/settings/notification" className="[&.active]:font-bold">
            Notifications
          </Link>
        </section>
      </div>
      <Outlet />

      {/* Dev Tools */}
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </React.Fragment>
  );
}
