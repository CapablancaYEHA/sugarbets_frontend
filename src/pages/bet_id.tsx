import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "preact/hooks";
import { useRoute } from "preact-iso";

//FIXME разобраться с функционалом
// import socket from "../lib/ws_connection";
import { findBet } from "../lib/client";

export const Bet = () => {
  const { params } = useRoute();
  const [val, setVal] = useState(0);
  const [cur, setCurr] = useState(undefined);

  const handleInput = (values) => {
    setVal(parseInt(values.value ?? "") || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit("betSubmit", {
    //   betAmount: val,
    //   betId: params.id,
    // });
  };

  //   useEffect(async () => {
  //     const kek = await findBet(params.id);
  //     setCurr(kek);
  //     socket.emit("betRoomJoin", {
  //       betId: params.id,
  //     });
  //   }, []);

  //   useEffect(() => {
  //     socket.on("betUpdateResponse", (data) => {
  //       setCurr((s) => ({
  //         ...s,
  //         betTotal: data.updatedValue,
  //       }));
  //     });
  //   }, []);

  //   useEffect(() => {
  //     return () => {
  //       socket.emit("betLeave", {
  //         betId: params.id,
  //       });
  //     };
  //   }, []);

  return (
    <form style={{ display: "block" }} onSubmit={handleSubmit}>
      {cur != null ? (
        <div style={{ margin: "0 0 32px 0" }}>
          <span style={{ display: "block" }}>Отображается ставка</span>
          <span style={{ display: "block" }}>
            <b>Название: </b>
            {cur.betName}
          </span>
          <span style={{ display: "block" }}>
            <b>На общую сумму: </b>
            {cur.betTotal}
          </span>
        </div>
      ) : null}
      <div>введите вашу ставку</div>
      <NumericFormat
        type="tel"
        value={val || ""}
        onValueChange={handleInput}
        defaultValue={0}
        thousandSeparator={" "}
        placeholder={0}
      />
      <button type="submit">Отправить ставку</button>
    </form>
  );
};
