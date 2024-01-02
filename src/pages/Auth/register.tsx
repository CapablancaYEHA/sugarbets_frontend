import { useForm } from "react-hook-form";
import { useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import {
  Button,
  Checkbox,
  PasswordInput,
  Space,
  TextInput,
  Box,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useRegister } from "../../api/queryHooks";
import styles from "./styles.module.scss";

export function Register() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, isError, isPending, mutate } = useRegister();

  const onSubmit = (sbmtData) => {
    mutate(
      {
        name: sbmtData.userName,
        mail: sbmtData.userMail,
        pass: sbmtData.userPass,
      },
      { onSuccess: () => location.route("/login") }
    );
  };

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Что-то пошло не так",
        message: error?.message,
        color: "red",
        autoClose: 5000,
        withBorder: true,
      });
    }
  }, [isError, error]);

  return (
    <Box className={styles.wrap} component="section">
      <form id="form_register" onSubmit={handleSubmit(onSubmit, undefined)}>
        <Title order={2}>Регистрация</Title>
        <Space h="md" />
        <Text size="md">
          Уже регистрировались?{" "}
          <Anchor href="/login" underline="always">
            Залогиньтесь
          </Anchor>
        </Text>
        <Space h="lg" />
        <TextInput
          {...register("userMail", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          label="Email"
          error={errors.userMail && <div>Формат мыла неверный</div>}
          required
        />
        <Space h="lg" />
        <PasswordInput
          {...register("userPass", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_$!%*?&-])[A-Za-z\d@_$!%*?&-]{8,}$/,
          })}
          label="Пароль"
          required
          error={
            errors.userPass && (
              <div>
                Только английские символы (минимум 8), обязательно: 1 прописная
                буква + цифра + спец символ @_-$!%*?&
              </div>
            )
          }
        />
        <Space h="lg" />
        <TextInput
          {...register("userName", {
            required: true,
            pattern: /^[a-zA-Zа-яА-Я0-9_-]{3,20}$/,
            maxLength: 20,
            min: 3,
          })}
          label="Отображаемое имя"
          required
          error={
            errors.userName && (
              <div>От 3 до 20 символов (разрешены - и _), без пробелов</div>
            )
          }
        />
        <Space h="lg" />
        <Checkbox
          {...register("agreement", { required: true })}
          label={
            <>
              Создавая аккаунт, я принимаю{" "}
              <a href="/terms" target="_blank" rel="noreferrer">
                условия
              </a>
            </>
          }
          error={
            errors.agreement && (
              <div>
                Для регистрации внимательно прочитайте правила сайта и примите
                их
              </div>
            )
          }
        />
        <Space h="xl" />
        <Button
          variant="light"
          type="submit"
          loading={isPending}
          fullWidth={false}
          style={{ alignSelf: "center", width: "min-content" }}
        >
          Создать аккаунт
        </Button>
      </form>
    </Box>
  );
}
