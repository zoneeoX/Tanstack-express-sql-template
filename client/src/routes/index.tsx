import { createFileRoute } from "@tanstack/react-router";
import { useDeleteTodo, useGetTodo } from "../react-query/queries";
import { deleteTodo } from "../api/api";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { status, data, error } = useGetTodo();
  const { mutateAsync: deleteTodo } = useDeleteTodo();

  interface ITodo {
    title: string;
    description: string;
    difficulty: string;
    due_date: string;
    id: number;
  }

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteTodo = async (id: number) => {
    console.log(id);
    try {
      const response = await deleteTodo(id);
      if (response?.ok) {
        console.log({ msg: "Nice one!" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="flex flex-col gap-6">
      {data.map(
        (
          { title, description, difficulty, due_date, id }: ITodo,
          i: number
        ) => (
          <li key={i} className="bg-slate-800 p-4 rounded-xl text-white">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p>{description}</p>
            <p>{difficulty}</p>
            <p>{due_date}</p>
            <div className="flex flex-row gap-2">
              <button>Edit</button>
              <button onClick={() => handleDeleteTodo(id)}>Delete</button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
