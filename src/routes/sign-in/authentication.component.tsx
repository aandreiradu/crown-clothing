import React, { useEffect } from "react";
import SignUpForm from "../../components/sign-up-form/SignUpForm";
import SignInForm from "../../components/sign-in-form/SignInForm";
import { AuthenticationContainer } from "./authentication.styles";
const Authentication = () => {

  return (
    <AuthenticationContainer>
      <SignInForm/>
      <SignUpForm/>
    </AuthenticationContainer>
  );
};

export default Authentication;
