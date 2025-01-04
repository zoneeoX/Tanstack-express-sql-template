import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/authentication/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [user, setUser] = useState({
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

  return (
    <form>
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
      <button type="submit" className="bg-slate-900 text-white">Submit Register</button>
    </form>
  );
}
