import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodo,
  editTodo,
  getSingleTodo,
  getTodo,
  getUser,
  loginUser,
  postTodo,
  postUser,
} from "../api/api";
import { ITodo, ITodoWithID, IUser } from "../types";

// Disini dimana fungsi react-query dijalanin
export const useGetTodo = () => {
  return useQuery({
    queryKey: ["getTodo"],
    queryFn: getTodo,
  });
};

export const useGetSingleTodo = (id: number) => {
  return useQuery({
    queryKey: ["getSingleTodo", id],
    queryFn: () => getSingleTodo(id),
  });
};

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: ITodo) => postTodo(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postTodo"],
      });
    },
  });
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ITodoWithID) => editTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTodo"],
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTodo"],
      });
    },
  });
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUser) => postUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postUser"],
      });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUser) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loginUser"],
      });
    },
  });
};

export const useGetLogUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await getUser(),
  });
}

// export const usePostTodo = ({
//   title,
//   description,
//   difficulty,
//   due_date,
// }: ITodo) => {
//   return useQuery({
//     queryKey: ["postTodo", { title, description, difficulty, due_date }],
//     queryFn: postTodo,
//   });
// };

// referensi : const [_key, { status, page }] = queryKey
