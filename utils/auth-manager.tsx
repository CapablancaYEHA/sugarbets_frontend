import { Context, createContext } from "preact";
import { FC } from "preact/compat";
import { useContext, useState } from "preact/hooks";

interface IContext {
  isAuth: boolean;
  setAuth: (a: boolean) => void;
}

export const AuthContext: Context<IContext> = createContext({
  isAuth: false,
  setAuth: () => {},
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
  const updater = (arg) => setAuth(arg);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth: updater,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
