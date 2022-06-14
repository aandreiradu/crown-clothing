import React, { useState, useContext } from "react";
import "./SignIn.scss";
import Button,{BUTTON_TYPES_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  signInWithGooglePopup,
  createUserDocumentAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, email } = formFields;

  //   input change handler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // sign in with google
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log("response", user);

    // moved to auth context;
    // const userDocRef = await createUserDocumentAuth(user);
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  // form submit handler
  const signInSubmitHandler = async (e) => {
    console.log("submit triggered");
    e.preventDefault();

    try {
      
      const {user} = await signInAuthWithEmailAndPassword(email, password);

    } catch (err) {
      console.log(err);
      console.log(err.message);

      switch (err.code) {
        case "auth/wrong-password": {
          alert("Incorrect password for email!");
          break;
        }

        case "auth/user-not-found": {
          alert("No user associated with this email!");
        }

        default: {
          throw new Error("default reached");
        }
      }
    }
  };

  return (
    <div className="sign-up-container">
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
