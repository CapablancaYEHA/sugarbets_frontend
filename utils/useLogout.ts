import { AxiosError } from "axios";
import { useAuth } from "./auth-manager";
import { useEffect } from "preact/hooks";

export function useLogout(
  isErr: boolean,
  err: AxiosError<
    {
      message?: string | undefined;
    },
    any
  > | null
) {
  const { setAuth } = useAuth();

  useEffect(() => {
    if (isErr && err?.response?.status === 401) {
      localStorage.removeItem("TOKEN");
      setAuth(false);
    }
  }, [isErr, err?.response?.status, setAuth]);
}
