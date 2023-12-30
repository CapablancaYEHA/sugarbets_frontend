import { useEffect } from "preact/hooks";
import { Box, LoadingOverlay, Space, Text, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useRoute } from "preact-iso";

import { useAuth } from "../../../utils/auth-manager";
import { useSingleEvent } from "../../api/queryHooks";
import { EventFull } from "../../components/event/eventFull";
import { EventBet } from "../../components/event/eventBet";
import { isEventComing } from "../Events/utils";

export const EventId = () => {
  const { setAuth } = useAuth();
  const { params } = useRoute();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isPending, isError, error, isSuccess } = useSingleEvent(
    params.id
  );

  useEffect(() => {
    if (isError) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("TOKEN");
        setAuth(false);
      } else {
        notifications.show({
          title: "Проблема запроса эвента",
          message: error?.message,
          color: "red",
          autoClose: 3000,
          withBorder: true,
        });
      }
    }
  }, [isError, error]);

  return (
    <Box
      component="section"
      py="lg"
      style={{
        display: "block",
        margin: "0 auto",
      }}
    >
      {isSuccess ? (
        <>
          <EventFull ev={data} />
          <Space h="lg" />
          <EventBet opened={opened} close={close} eventId={params.id} />
          {isEventComing(data) && data.isActive ? (
            <Text size="sm" c="red">
              Эвент еще только ожидается. Ставки на него пока что не
              принимаются.
            </Text>
          ) : !data.isActive ? (
            <Text size="sm" c="red">
              Эвент уже состоялся. Ставки на него не принимаются.
            </Text>
          ) : (
            <Button onClick={open}>Предсказать топ8</Button>
          )}
        </>
      ) : null}
      <LoadingOverlay
        visible={isPending}
        zIndex={30}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
