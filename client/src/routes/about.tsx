import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {

  const queryClient = useQueryClient();



  return <div>Hello "/about"!</div>;
}
