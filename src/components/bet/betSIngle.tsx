import { FC } from "preact/compat";
import { Modal, Skeleton } from "@mantine/core";
import { useSingleBet } from "../../api/queryHooks";
import { ResultTable } from "../event/resultTable";

interface IProp {
  opened: boolean;
  close: () => void;
  id: string;
}

export const BetSingle: FC<IProp> = ({ opened, close, id }) => {
  const { data, isPending, isSuccess } = useSingleBet(id, opened);

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {isPending ? <Skeleton height={550} /> : null}
      {isSuccess ? (
        <ResultTable betBody={data.betBody} game={data.game} />
      ) : null}
    </Modal>
  );
};
