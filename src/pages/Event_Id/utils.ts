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
