import { useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { useBets } from "../api/queryHooks";
import { useAuth } from "../../utils/auth-manager";

export const Bets = () => {
  const location = useLocation();
  const { setAuth } = useAuth();

  const { data, error, isError } = useBets();

  useEffect(() => {
    if (isError && error?.response?.status === 401) {
      localStorage.removeItem("TOKEN");
      setAuth(false);
    }
  }, [isError, error?.response?.status]);

  return (
    <div>
      Список ставок дериктории:
      <ul>
        {data != null && data?.length > 0
          ? data.map((a) => (
              <li
                key={a.id}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => location.route(`/bets/${a.id}`)}
              >
                {a.betName}__{a.betTotal}рублей
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
