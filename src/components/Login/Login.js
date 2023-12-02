import React, { useState, useContext, useReducer ,useRef } from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "PASS_TYPE") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "BLUR_INPUT") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
   const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [enteredCollegeName, setEnteredCollegeName] = useState("");

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef =useRef()
  const collegeInputRef =useRef()
  const passwordInputRef =useRef()

  // useEffect(()=>{
  //   const identifier=setTimeout(()=>{
  //    console.log('checking the form validity')
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length>0
  //   );
  //   },500)
  //   return ()=>{
  //     console.log('clean up')
  //     clearTimeout(identifier)
  //   }

  // },[enteredEmail , enteredPassword , enteredCollegeName])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        enteredCollegeName.trim().length > 0
    );
  };
  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        enteredCollegeName.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASS_TYPE", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollegeName.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const validateCollegeNameHandler = () => {
    setCollegeIsValid(enteredCollegeName.trim().length > 0);
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "BLUR_INPUT" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value, enteredCollegeName);
    }
     if(!emailIsValid){
     emailInputRef.current.focus()
    }
     if(!collegeIsValid){
      collegeInputRef.current.focus()
    }
    else if(!passwordIsValid) {
passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
        ref={collegeInputRef}
          id="collegeName"
          label="collegename"
          type="text"
          isValid={collegeIsValid}
          value={enteredCollegeName}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
        />
        <Input
        ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
