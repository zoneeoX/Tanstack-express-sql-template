import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter, Link } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <section className="flex items-center flex-col gap-6 justify-center text-center font-bold h-screen bg-slate-900 text-red-900 text-7xl">
        <h1>Page you are requesting is unkown.</h1>
        <Link to="/">
          <p className="text-white text-lg underline">
            Go to home component :D
          </p>
        </Link>
      </section>
    );
  },
});


declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
