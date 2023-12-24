import { useForm } from "react-hook-form";
import { useLocation } from "preact-iso";
import {
  Button,
  PasswordInput,
  Space,
  TextInput,
  Notification,
  Box,
  Title,
  Text,
  Anchor,
} from "@mantine/core";

import { useLogin } from "../../api/queryHooks";
import { useAuth } from "../../../utils/auth-manager";
import styles from "./styles.module.scss";

export function Login() {
  const location = useLocation();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, isError, isPending, mutate } = useLogin();

  const onSubmit = (sbmtData) => {
    mutate(
      {
        mail: sbmtData.userMail,
        pass: sbmtData.userPass,
      },
      {
        onSuccess: (res) => {
          localStorage.setItem("TOKEN", res);
          setAuth(true);
          location.route("/");
        },
      }
    );
  };

  return (
    <Box className={styles.wrap} component="section">
      <div>
        <Title order={2}>Вход</Title>
        <Space h="md" />
        <Text size="md">
          Нет аккаунта?{" "}
          <Anchor href="/register" underline="always">
            Зарегистрироваться
          </Anchor>
        </Text>
        <Space h="lg" />
        <TextInput
          {...register("userMail", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          required
          label="Email"
          error={errors.userMail && <div>Формат мыла неверный</div>}
          style={{ width: "100%" }}
        />
        <Space h="lg" />
        <PasswordInput
          {...register("userPass", {
            required: true,
            min: 8,
          })}
          required
          label="Пароль"
          error={
            errors.userPass && (
              <div>
                8 символов минимум - таково было требование к паролю при
                регистрации
              </div>
            )
          }
        />
        <Space h="xl" />
        <Button
          variant="light"
          color="pink"
          onClick={handleSubmit(onSubmit, undefined)}
          loading={isPending}
          fullWidth={false}
          style={{ alignSelf: "center", width: "min-content" }}
        >
          Войти
        </Button>
        <Space h="lg" />
        {isError ? (
          <Notification
            color="red"
            title="Что-то пошло не так"
            withBorder
            withCloseButton={false}
          >
            {error?.message}
          </Notification>
        ) : null}
      </div>
    </Box>
  );
}
