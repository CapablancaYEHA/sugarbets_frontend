import { useForm } from "react-hook-form";
import { useLocation } from "preact-iso";

import { useRegister } from "../../api/queryHooks";

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

  return (
    <div style={{ display: "flex", flexFlow: "column nowrap", maxWidth: 300 }}>
      <h1>Регистрируемся</h1>
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
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_$!%*?&-])[A-Za-z\d@_$!%*?&-]{8,}$/,
        })}
        type="text"
        placeholder="пароль"
      />
      {errors.userPass && (
        <p style={{ color: "red" }}>
          Только Eng, минимум 8 символов + at least one upper case,one lower
          case,one number,one special character @_-$!%*?&
        </p>
      )}
      <input
        {...register("userName", {
          required: true,
          pattern: /^[a-zA-Zа-яА-Я0-9_-]{3,20}$/,
          maxLength: 15,
          min: 3,
        })}
        placeholder="имя"
      />
      {errors.userName && (
        <p style={{ color: "red" }}>
          Англ и Рус буквы, цифры, символы - и _. Без пробелов. От 3 до 20
          символов
        </p>
      )}
      <div style={{ display: "flex" }}>
        <input {...register("agreement", { required: true })} type="checkbox" />
        <span style={{ display: "block", margin: "0 0 0 16px" }}>Согласен</span>
      </div>
      {errors.agreement && <p style={{ color: "red" }}>Не отмечено</p>}
      <button onClick={handleSubmit(onSubmit, undefined)}>
        {isPending ? ">>>" : "Зарегистрироваться"}
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
