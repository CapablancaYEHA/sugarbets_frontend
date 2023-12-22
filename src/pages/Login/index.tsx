import { useForm } from "react-hook-form";
import { useLocation } from "preact-iso";
import { useLogin } from "../../api/queryHooks";
import { useAuth } from "../../../utils/auth-manager";

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
    <div style={{ display: "flex", flexFlow: "column nowrap", maxWidth: 300 }}>
      <h1>Логинимся</h1>
      <input
        {...register("userMail", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
        type="text"
        placeholder="мыло"
      />
      {errors.userMail && <p style={{ color: "red" }}>Формат мыла неверный</p>}
      <input
        {...register("userPass", {
          required: true,
          min: 8,
        })}
        type="text"
        placeholder="пароль"
      />
      {errors.userPass && (
        <p style={{ color: "red" }}>
          8 символов минимум - таково было требование к паролю при регистрации
        </p>
      )}
      <button onClick={handleSubmit(onSubmit, undefined)}>
        {isPending ? ">>>" : "Войти"}
      </button>

      {isError ? (
        <div
          style={{ background: "red", color: "white", margin: "32px 0 0 0" }}
        >
          {error?.message}
        </div>
      ) : null}
    </div>
  );
}
