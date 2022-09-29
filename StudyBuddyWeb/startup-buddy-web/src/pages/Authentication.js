import React, { useState, useContext } from "react";
import classes from "../components/Auth/Authentication.module.css";
import LoginForm from "../components/Auth/Login/LoginForm"
import RegisterForm from "../components/Auth/Register/RegisterForm";
import { TranslationContext } from "../store/translation-context";
const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useContext(TranslationContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? `${t("Authentication.Login")}` : `${t("Authentication.CreateAccount")}`}</h1>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className={classes.actions}>
          {isLoading && <p>Loading...</p>}
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? `${t("Authentication.CreateNewAccount")}` : `${t("Authentication.LoginWithExisting")}`}
          </button>
        </div>
      </section>
    </>
  );
};

export default Authentication;
