import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { IUser } from "../../types";
import { useLoginUser } from "../../react-query/queries";

export const Route = createFileRoute("/authentication/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync: loginUser } = useLoginUser();

  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });

  function redirectToRegister() {
    navigate({ to: "/authentication/register" });
  }

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(user);
      return response;
    } catch (error) {
      console.log({ msg: "ERROR MESSAGE: ", error });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="">username</label>
            <input
              type="text"
              name="username"
              className="bg-slate-900 text-white"
              value={user.username}
              onChange={handleForm}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              className="bg-slate-900 text-white"
              value={user.password}
              onChange={handleForm}
            />
          </div>

          <button type="submit">Login</button>
        </fieldset>
      </form>
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
