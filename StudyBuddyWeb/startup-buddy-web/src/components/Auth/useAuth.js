import { TranslationContext } from "../../store/translation-context";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";
import useHttp from "../http/useHttp";

const useAuth = () => {
  const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
  const [isSent, setIsSent] = useState(false);
  const baseURL =  process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useContext(TranslationContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const registrationInitialValues = {
    email: "",
    password: "",
  };

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const { fetchData: fetchRegister, response: responseRegister } = useHttp({
    autoRun: false,
    method: "post",
    url: "/Account/Register",
    headers: {
      "content-type": "application/json",
    },
  });

  const closeSnackBarHandle = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  const submitHandlerRegister = async (values) => {
    await sleep(3000);
    fetchRegister(values);
    console.log("values", values);
    setIsSent(true);
  };


  const submitHandlerLogin = async (values) => {
    console.log("values", values);
    setIsLoading(true);
    let url;
    url = "https://localhost:7290/api/Account/Login";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = t("Errors.Unexpected");
            throw new Error(errorMessage); 
          });
        }
      })
      .then((data) => {
        console.log(data);
        const expirationTime = new Date(new Date().getTime() + 30 * 60000); 
        authCtx.login(data.authorizationToken, expirationTime.toISOString());
        history.replace("/"); 
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return {
    isLoading,
    t,
    submitHandlerRegister,
    isSent,
    closeSnackBarHandle,
    submitHandlerLogin,
    loginInitialValues,
    registrationInitialValues,
  };
};

export default useAuth;
