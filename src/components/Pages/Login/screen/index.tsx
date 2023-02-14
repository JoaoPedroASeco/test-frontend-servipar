import Head from "next/head";
import { LoginFormulary } from "../components/LoginFormulary";
import { LoginHeader } from "../components/LoginHeader";

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
