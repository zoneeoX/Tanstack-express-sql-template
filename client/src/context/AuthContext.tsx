import { useGetLogUser } from "../react-query/queries";

export const useAuth = () => {
  const { data, isLoading, isError, isFetched } = useGetLogUser();

  return {
    username: data?.user?.username || "",
    isLogged: data?.loggedIn || false,
    isLoading,
    isError,
    isFetched,
  };
};
