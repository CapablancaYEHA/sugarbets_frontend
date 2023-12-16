import { useLocation } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { getBets } from "../lib/client";

export const Bets = () => {
  const location = useLocation();
  const [cur, setCurr] = useState(undefined);

  //   @ts-ignore
  useEffect(async () => {
    const kek = await getBets();
    setCurr(kek);
  }, []);

  return (
    <div>
      Список ставок дериктории:
      <ul>
        {cur != null && cur.length > 0
          ? cur.map((a) => (
              <li
                style={{
                  padding: "5px",
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
