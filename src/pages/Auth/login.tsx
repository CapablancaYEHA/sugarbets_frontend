import { useForm } from "react-hook-form";
import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import {
  Button,
  PasswordInput,
  Space,
  TextInput,
  Box,
  Title,
  Text,
  Anchor,
} from "@mantine/core";

import { useLogin } from "../../api/queryHooks";
import { useAuth } from "../../../utils/auth-manager";
import { notif } from "../../../utils/notif";
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
          localStorage.setItem("TOKEN", res.token);
          localStorage.setItem("USER", res.userId);
          setAuth(true);
          setTimeout(() => location.route("/"), 300);
        },
      }
    );
  };

  useEffect(() => {
    if (isError) {
      notif({ c: "red", t: "Что-то пошло не так", m: error?.message });
    }
  }, [isError, error]);

  return (
    <Box className={styles.wrap}>
      <form id="form_login" onSubmit={handleSubmit(onSubmit, undefined)}>
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
            minLength: 8,
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
          loading={isPending}
          fullWidth={false}
          style={{ alignSelf: "center", width: "min-content" }}
          type="submit"
        >
          Войти
        </Button>
      </form>
    </Box>
  );
}
