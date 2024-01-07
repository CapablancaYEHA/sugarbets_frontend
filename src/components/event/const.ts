import { format } from "date-fns/format";
import { ru } from "date-fns/locale";
import * as yup from "yup";

import logoT8 from "../../assets/logo_t8.png";
import logoSF6 from "../../assets/logo_sf6.png";
import logoOrgCup from "../../assets/logo_org_cup.png";
import logoOrgTwt2023 from "../../assets/logo_org_twt2023.png";

export const logoByGame = {
  T8: logoT8,
  SF6: logoSF6,
};

export const logoByOrg = {
  getToCup: logoOrgCup,
  TWT2023: logoOrgTwt2023,
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
