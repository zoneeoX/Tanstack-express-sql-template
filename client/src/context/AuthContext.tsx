import { createContext, useContext, ReactNode } from "react";
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

interface AuthContextType {
  username: string;
  isLogged: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetched: boolean;
}

const defaultAuthContext: AuthContextType = {
  username: "",
  isLogged: false,
  isLoading: false,
  isError: false,
  isFetched: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
