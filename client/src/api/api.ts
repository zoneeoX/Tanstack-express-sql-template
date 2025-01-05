// Function untuk komunikasi ke backend gunain axios
import axios from "axios";

interface todoInformation {
  title: string;
  description: string;
  difficulty: string;
  due_date: string;
  id: number;
}

export async function getTodo() {
  try {
    const response = await axios.get("http://localhost:3000/api/todo/");

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleTodo(id: todoInformation["id"]) {
  try {
    const response = await axios.get(`http://localhost:3000/api/todo/${id}`);
    if (!response) {
      console.log({ msg: "Error" });
    }
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function postTodo(data: todoInformation) {
  const { title, description, difficulty, due_date } = data;
  try {
    const response = await axios.post("http://localhost:3000/api/todo/create", {
      title,
      description,
      difficulty,
      due_date,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editTodo(data: todoInformation) {
  const { title, description, difficulty, due_date, id } = data;
  try {
    const response = await axios.put(
      `http://localhost:3000/api/todo/edit/${id}`,
      {
        title,
        description,
        difficulty,
        due_date,
      }
    );
    return console.log({ msg: "Success", data: response });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(id: todoInformation["id"]) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/todo/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// export async function postTodo({ queryKey }: any) {
//   const [_key, { title, description, difficulty, due_date }] = queryKey;
//   try {
//     console.log(title, description, difficulty, due_date);
//   } catch (error) {
//     console.log(error);
//   }
// }
