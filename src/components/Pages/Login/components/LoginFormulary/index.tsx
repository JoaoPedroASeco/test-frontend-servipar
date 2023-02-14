import {
  useState,
  FormEvent,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import Router from "next/router";

//Libs
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";

//Styles
import { LoginFormularyContainer } from "./styles";

//Components
import { ThemeButton } from "@/components/General/Button";
import { ThemeInput } from "@/components/General/Input";
import { api } from "@/services/api";

//Types
interface FormData {
  email: string;
  password: string;
}

//Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email é um campo obrigatorio!")
    .min(6, "Email invalido! tamanho minimo de 6 digitos."),
  password: yup
    .string()
    .required("Senha é um campo obrigatorio!")
    .min(3, "Senha invalida! tamanho minimo de 3 digitos."),
});

export const LoginFormulary = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isRegistringUser, setIsRegistringUser] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies && cookies.undefined_token) {
      toast.error("Login necessario");
      destroyCookie(null, "undefined_token");
    } else if (cookies && cookies.invalid_token) {
      toast.error("Seu login expirou! faça o login novamente!");
      destroyCookie(null, "invalid_token");
    }
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        await schema.validate(formData, { abortEarly: false });

        const { data } = await api.post(
          !isRegistringUser ? "/auth/login" : "/auth/register",
          formData
        );

        setCookie(null, "acess_token", data.access_token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        Router.push("/home");

        return toast.success(
          !isRegistringUser ? "Login efetuado!" : "Sucesso ao cadastrar!"
        );
      } catch (error: any) {
        if (error?.inner?.lenght) {
          const errorObject = error.inner.reduce((errors: any, err: any) => {
            errors[err.path] = err.message;
            return errors;
          }, {});
          setFormErrors(errorObject);
        }

        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log("error", error);
          return toast.error("Erro ao realizar o login!");
        } else {
          return toast.error("Erro interno, tente novamente");
        }
      }
    },
    [formData, isRegistringUser]
  );

  return (
    <LoginFormularyContainer onSubmit={handleSubmit}>
      <ThemeInput
        type="text"
        name="email"
        id="email"
        label="E-mail"
        value={formData.email}
        placeholder="Digite seu E-mail"
        onChange={handleChange}
        error={formErrors.email}
      />

      <ThemeInput
        label="Senha"
        type="password"
        name="password"
        id="password"
        value={formData.password}
        placeholder="Digite sua senha"
        onChange={handleChange}
        error={formErrors.password}
      />

      <ThemeButton type="submit">
        {!isRegistringUser ? "Login" : "Cadastrar"}
      </ThemeButton>

      <span
        className="user-register-question"
        onClick={() => setIsRegistringUser(!isRegistringUser)}
      >
        {!isRegistringUser ? (
          <>
            Ainda não tem uma conta? <strong>cadastre-se.</strong>
          </>
        ) : (
          <>
            Já tem uma conta? <strong>faça o Login.</strong>
          </>
        )}
      </span>
    </LoginFormularyContainer>
  );
};