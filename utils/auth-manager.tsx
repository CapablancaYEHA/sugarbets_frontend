import { Context, createContext } from "preact";
import { FC } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";

interface IContext {
  isAuth: boolean;
  setAuth: (a) => void;
  userId?: string;
}

export const AuthContext: Context<IContext> = createContext<IContext>({
  isAuth: false,
  setAuth: () => {},
  userId: undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
  let token;

  const initialState = () => {
    token = localStorage.getItem("TOKEN") || "";
    if (token) {
      return true;
    }
    return false;
  };

  const [isAuth, setAuth] = useState(initialState);
  const [userId, setUser] = useState<string | undefined>(undefined);
  const updater = (arg) => setAuth(arg);

  useEffect(() => {
    const userString = localStorage.getItem("USER") || "";
    if (userString) {
      setUser(userString);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth: updater,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
