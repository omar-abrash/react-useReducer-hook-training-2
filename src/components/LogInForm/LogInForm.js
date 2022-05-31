import React, { useReducer } from "react";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./LogInForm.module.css";

const formReducerFun = (state, action) => {
  if (action.type === "USER_NAME_INPUT") {
    return {
      ...state,
      userNameInput: action.val,
      formValidation:
        action.val.trim().length > 5 && state.passWordInput.trim().length > 5,
    };
  }
  if (action.type === "PASS_WORD_INPUT") {
    return {
      ...state,
      passWordInput: action.val,
      formValidation:
        action.val.trim().length > 5 && state.userNameInput.trim().length > 5,
    };
  }
  if (action.type === "USER_NAME_BLUR") {
    return { ...state, userNameValidty: action.blurVal };
  }
  if (action.type === "PASS_WORD_BLUR") {
    return { ...state, passWordValidty: action.blurVal };
  }
  return {
    userNameInput: "",
    userNameValidty: null,
    passWordInput: "",
    passWordValidty: null,
    formValidation: false,
  };
};

const LogInForm = (props) => {
  // we need replace these useStates to useReducer

  // const [userName, setUserName] = useState("");
  // const [userPassWord, setUserPassWord] = useState("");
  // const [userNameValidety, setUserNameValidety] = useState(null);
  // const [userPassWordValidety, setUserPassWordValidety] = useState(null);
  // const [formValidation, setFormValidation] = useState(false);

  const [formState, actionFormDispatch] = useReducer(formReducerFun, {
    userNameInput: "",
    userNameValidty: null,
    passWordInput: "",
    passWordValidty: null,
    formValidation: false,
  });

  const userNameChangeHandler = (event) => {
    actionFormDispatch({ type: "USER_NAME_INPUT", val: event.target.value });
    // setFormValidation(
    //   event.target.value.trim().length > 5 && userPassWordValidety
    // );
  };

  const passWordChangeHandler = (event) => {
    actionFormDispatch({ type: "PASS_WORD_INPUT", val: event.target.value });
    // setFormValidation(event.target.value.trim().length > 5 && userNameValidety);
  };

  const userNameBlurHandler = () => {
    actionFormDispatch({
      type: "USER_NAME_BLUR",
      blurVal: formState.userNameInput.trim().length > 5,
    });
  };
  const passWordBlurHandler = () => {
    actionFormDispatch({
      type: "PASS_WORD_BLUR",
      blurVal: formState.passWordInput.trim().length > 5,
    });
  };

  const formDataHandler = (event) => {
    event.preventDefault();
    props.afterEnteredData(formState.userNameInput, formState.passWordInput);
  };

  return (
    <main>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <form className={styles.form} onSubmit={formDataHandler}>
            <div>
              <label htmlFor="userName">User Name</label>
              <input
                id="userName"
                type="text"
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                value={formState.userNameInput}
                className={
                  formState.userNameValidty === null ||
                  formState.userNameValidty === true
                    ? ""
                    : styles["not-valid"]
                }
                placeholder="At Least Six Character"
              />
            </div>
            <div>
              <label htmlFor="passWord">Password</label>
              <input
                id="passWord"
                type="password"
                onChange={passWordChangeHandler}
                onBlur={passWordBlurHandler}
                value={formState.passWordInput}
                className={
                  formState.passWordValidty === null ||
                  formState.passWordValidty === true
                    ? ""
                    : styles["not-valid"]
                }
                placeholder="At Least Six Character"
              />
            </div>
            <div>
              <Button
                className={styles.btn}
                type={"submit"}
                disabled={!formState.formValidation}
              >
                Log In
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </main>
  );
};

export default LogInForm;
