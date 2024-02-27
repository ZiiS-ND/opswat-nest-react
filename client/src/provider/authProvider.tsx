import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import httpClientInstance from "../httpClient";

type AuthContextType = {
  token: string | null;
  setToken: (a: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: "" || null,
  setToken: () => {},
});

type AuthProviderType = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderType) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      httpClientInstance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete httpClientInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
