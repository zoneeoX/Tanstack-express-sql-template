import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/authentication/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  function redirectToRegister() {
    navigate({to: "/authentication/register"})
  }

  return (
    <div>
      Hello "/authentication/login"!{" "}
      <p>
        dont have account?{" "}
        <span
          className="text-blue-400 cursor-pointer"
          onClick={redirectToRegister}
        >
          Click here to register
        </span>
      </p>
    </div>
  );
}
