import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { usePostTodo } from "../../react-query/queries";
import { ITodo } from "../../types";

export const Route = createFileRoute("/todo/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  // interface ITodo {
  //   title: string;
  //   description: string;
  //   difficulty: string;
  //   due_date: string;
  // }

  const [data, setData] = useState<ITodo>({
    title: "",
    description: "",
    difficulty: "",
    due_date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutateAsync: postTodo } = usePostTodo();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postTodo(data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate({ to: "/" });
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-6">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="bg-slate-900 text-white"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            className="bg-slate-900 text-white"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            className="bg-slate-900 text-white"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            name="due_date"
            className="bg-slate-900 text-white"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>

      <button
        className="bg-slate-800 text-white p-4 rounded-full"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
