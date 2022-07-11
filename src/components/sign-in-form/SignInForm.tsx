import React, { useState, useContext,FormEvent,ChangeEvent } from "react";
import { AuthErrorCodes,AuthError } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button,{BUTTON_TYPES_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
// import {
//   signInWithGooglePopup,
//   createUserDocumentAuth,
//   signInAuthWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { googleSignInStart,emailSignInStart } from "../../store/user/user.action";
import { SignInContainer,ButtonsContainer } from "./SignIn.styles";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, email } = formFields;
  const navigate = useNavigate();

  //   input change handler
  const inputChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // sign in with google
  const signInWithGoogle = async () => {

    // without saga
    // const { user } = await signInWithGooglePopup();
    // console.log("response", user);

    // with saga
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  // form submit handler
  const signInSubmitHandler = async (e : FormEvent<HTMLFormElement>) => {
    console.log("submit triggered");
    e.preventDefault();

    try {
      
      // without saga
      // const {user} = await signInAuthWithEmailAndPassword(email, password);

      // with saga
      dispatch(emailSignInStart(email,password));
      navigate('/shop');
      resetFormFields();
    } catch (err) {
      console.log(err);
    
      // switch (err.code) {
      //   case "auth/wrong-password": {
      //     alert("Incorrect password for email!");
      //     break;
      //   }

      //   case "auth/user-not-found": {
      //     alert("No user associated with this email!");
      //     break;
      //   }

      //   default: {
      //     throw new Error("default reached");
      //   }
      // }
      switch ((err as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD: {
          alert("Incorrect password for email!");
          break;
        }

        case AuthErrorCodes.USER_DELETED : {
          alert("No user associated with this email!");
          break;
        }

        default: {
          throw new Error("default reached");
        }
      }
    }
  };

  return (
    <SignInContainer className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={signInSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={inputChangeHandler}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={inputChangeHandler}
          name="password"
          value={password}
        />
        <ButtonsContainer className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
