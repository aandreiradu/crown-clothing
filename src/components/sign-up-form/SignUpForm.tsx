import React, { useState, FormEvent, ChangeEvent} from "react";
import { AuthErrorCodes, AuthError } from "firebase/auth";
import {
  createAuthWithEmailAndPassword,
  createUserDocumentAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import "./SignUpForm.styles.tsx";
import { signUpStart } from "../../store/user/user.action";
import { SignUpContainer } from "./SignUpForm.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, password, confirmPassword, email } = formFields;

  const inputChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  const submitFormHandler = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords dont match");
      return;
    }

    try {
      // without saga
      // const { user } = await createAuthWithEmailAndPassword(email, password);

      // const userDocRef = await createUserDocumentAuth(user, { displayName });

      // with saga
      dispatch(signUpStart(email,password,displayName));

      resetFormFields();
    } catch (error) {
      console.log('error',error);
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
    
      /*catch (err) {
      // if (err.code === "auth/email-already-in-use") {
      //   alert("Email already in use");
      //   return;
      // }
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already in use");
        return;
      }

      console.log(
        "error when trying to create user with email and password",
        err
      );*/
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up with you email and password</span>
      <form onSubmit={submitFormHandler}>
        <FormInput
          type="text"
          onChange={inputChangeHandler}
          name="displayName"
          label="Display Name"
          required
          value={displayName}
        />

        <FormInput
          type="email"
          onChange={inputChangeHandler}
          name="email"
          label="Email"
          required
          value={email}
        />

        <FormInput
          type="password"
          onChange={inputChangeHandler}
          name="password"
          label="Password"
          required
          value={password}
        />

        <FormInput
          type="password"
          onChange={inputChangeHandler}
          name="confirmPassword"
          label="Confirm Password"
          required
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
