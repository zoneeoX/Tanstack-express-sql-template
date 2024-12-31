import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEditTodo, useGetSingleTodo } from "../../react-query/queries";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/todo/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { status, data, error } = useGetSingleTodo(Number(id));
  const { mutateAsync: editTodo } = useEditTodo();
  const navigate = useNavigate();

  const [changedData, setChangedData] = useState({
    title: "",
    description: "",
    difficulty: "",
    due_date: "",
    id: "",
  });

  useEffect(() => {
    if (data) {
      setChangedData({
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        due_date: new Date(data.due_date).toLocaleDateString("en-CA"),
        id,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangedData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error" && error) return <div>Error...</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await editTodo(changedData);
    } catch (error) {
      console.log(error);
    } finally {
      navigate({ to: "/" });
    }
  };

  return (
    <form
      className="flex flex-col gap-2 text-white w-fit"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="text-black">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="bg-slate-900"
          value={changedData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-black">
          Description
        </label>
        <input
          type="text"
          name="description"
          className="bg-slate-900"
          value={changedData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="difficulty" className="text-black">
          Difficulty
        </label>
        <input
          type="text"
          name="difficulty"
          className="bg-slate-900"
          value={changedData.difficulty}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="due_date" className="text-black">
          Due Date
        </label>
        <input
          type="date"
          name="due_date"
          className="bg-slate-900"
          value={changedData.due_date}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="bg-slate-900">
        Submit
      </button>
    </form>
  );
}
