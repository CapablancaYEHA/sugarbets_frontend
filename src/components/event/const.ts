import { format } from "date-fns/format";
import { ru } from "date-fns/locale";
import * as yup from "yup";

import logoT8 from "../../assets/logo_t8.png";
import logoOrgCup from "../../assets/logo_org_cup.png";

export const logoByGame = {
  T8: logoT8,
  //   default: logoDummy,
};

export const logoByOrg = {
  getToCup: logoOrgCup,
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
  format(a ?? 0, "eeee, d MMMM y", { locale: ru });

//   {
//     1: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 0),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     2: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 1),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     3: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 2),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     4: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 3),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     5: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 4),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     6: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 5),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     7: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 6),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//     8: yup
//       .string()
//       .notOneOf(
//         refArr.filter((a, ind) => ind !== 7),
//         "Не должны совпадать"
//       )
//       .required("Required"),
//   }
