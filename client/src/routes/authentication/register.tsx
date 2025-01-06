import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { IUser } from "../../types";
import { usePostUser } from "../../react-query/queries";

export const Route = createFileRoute("/authentication/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: postUser } = usePostUser();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });

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
      const response = await postUser(user);
      console.log(response);

      if (response) {
        navigate({ to: "/authentication/login" });
      }
    } catch (error) {
      console.log({ msg: "ERROR MESSAGE: ", error });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="bg-slate-900 text-white"
            name="username"
            value={user.username}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="bg-slate-900 text-white"
            name="password"
            value={user.password}
            onChange={handleForm}
          />
        </div>
      </fieldset>
      <button type="submit" className="bg-slate-900 text-white">
        Submit Register
      </button>
    </form>
  );
}
