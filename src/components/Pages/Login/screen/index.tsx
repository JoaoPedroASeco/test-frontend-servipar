import { LoginFormulary } from "../components/LoginFormulary";
import { LoginHeader } from "../components/LoginHeader";
import Head from "next/head";

//Styles
import { LoginContainer, LoginComponent } from "./Login";

export const LoginScreen = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <LoginComponent>
          <LoginHeader />
          <LoginFormulary />
        </LoginComponent>
      </LoginContainer>
    </>
  );
};
