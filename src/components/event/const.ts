import { format } from "date-fns/format";
import { ru } from "date-fns/locale";
import * as yup from "yup";

import logoT8 from "../../assets/logo_t8.png";
import logoOrgCup from "../../assets/logo_org_cup.png";

export const logoByGame = {
  T8: logoT8,
};

export const logoByOrg = {
  getToCup: logoOrgCup,
};

export const titleByGame = {
  T8: "Tekken 8",
  SF6: "Street Fighter 6",
};

export const betDraftArr: string[] = new Array(8).fill("");
export const tableTdByIndex = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: "5-6",
  6: "5-6",
  7: "7-8",
  8: "7-8",
};

export const refArr = Object.keys(tableTdByIndex).map((a) => yup.ref(a));

const makeShape = () =>
  Object.keys(tableTdByIndex).reduce((tot, am) => {
    return {
      ...tot,
      [am]: yup.lazy((value) =>
        yup
          .string()
          .notOneOf(
            refArr.filter((a, ind) => value != null && ind !== Number(am) - 1),
            `не может совпадать с игроком ${value}`
          )
          .required("Нужно выбрать игрока")
      ),
    };
  }, {});

export const schema = yup
  .object()
  .shape({ ...makeShape(), game: yup.string().nullable().required() })
  .required();

export const showDate = (a: string) =>
  format(a ?? 0, "d MMMM y", { locale: ru });

const sbtKeysToDel = ["game", "5", "6", "7", "8"];
export const prepSbt = (smtDt: any) => {
  const five = [smtDt["5"], smtDt["6"]].sort();
  const seven = [smtDt["7"], smtDt["8"]].sort();
  let final = {
    ...smtDt,
    56: five,
    78: seven,
  };
  sbtKeysToDel.forEach((k) => delete final[k]);
  return JSON.stringify(final);
};
