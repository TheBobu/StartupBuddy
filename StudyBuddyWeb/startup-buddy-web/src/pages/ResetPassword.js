import { useState, useContext } from "react";
import classes from "../Auth/Authentication.module.css";
import { TranslationContext } from "../../store/translation-context";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import Controls from "../Controls/Controls";
import { Box, Card, CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import { useLocation, useHistory } from "react-router";
const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState({
    trigger: false,
    message: "",
  });

  const history = useHistory();
  const { t } = useContext(TranslationContext);
  const { search } = useLocation();

  let user = atob(new URLSearchParams(search).get("user"));
  user = JSON.parse(user);

  const closeSnackBarHandle = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSent({ trigger: false, message: "" });
  };

  const submitHandler = async (values) => {
    const password = values.password;
    const cofirmPassword = values.confirmPassword;
    setIsLoading(true);
    let url;
    if (user.Email == null && user.Password == null) {
      setIsSent({ trigger: true, message: `${t("Errors.Unexpected")}` });
    } else if (password !== cofirmPassword) {
      setIsSent({ trigger: true, message: `${t("Errors.DifferentPasswords")}` });
    } else if (user.Password === password) {
      setIsSent({ trigger: true, message: `${t("Errors.NewPasswordIsNotDifferentFromOld")}` });
    } else {
      url = process.env.REACT_APP_BASE_URL + "/authentication/reset-password/";
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: user.Email,
          password: password,
          resetPasswordKey: user.ResetPasswordKey,
        }),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            setIsSent({ trigger: true, message: `${t("Authentication.ResetPasswordConfirmation")}` });

            setTimeout(() => {
              history.replace("/auth");
            }, 5000);
          } else {
            return res.json().then((data) => {
              let errorMessage;
              if (data && data.value) {
                errorMessage = t("Errors.Unexpected");
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {})
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const resetPasswordValidationSchema = () => {
    return Yup.object().shape({
      password: Yup.string()
        .required(t("Authentication.RequiredField"))
        .min(8, t("Authentication.ShortPassword"))
        .matches(/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/, t("Authentication.PasswordRules")),
      confirmPassword: Yup.string()
        .required(t("Authentication.RequiredField"))
        .min(8, t("Authentication.ShortPassword"))
        .matches(/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/, t("Authentication.PasswordRules")),
    });
  };

  return (
    <section className={classes.auth}>
      <span>{t("Authentication.ResetPasswordMsg")}</span>
      <Card>
        <CardContent>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={submitHandler}
          >
            <Form autoComplete="off">
              <Grid container sx={{ mt: 4 }}>
                <Grid item xs={12}>
                  <Box paddingBottom={3} sx={{ mr: 2 }}>
                    <Field
                      style={{ width: "100%" }}
                      label={t("Authentication.Password")}
                      name="password"
                      type="password"
                      component={TextField}
                      placeholder={t("Authentication.Password")}
                    ></Field>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box paddingBottom={3}>
                    <Field
                      style={{ width: "100%" }}
                      label={t("Authentication.ConfirmPassword")}
                      name="confirmPassword"
                      type="password"
                      component={TextField}
                      placeholder={t("Authentication.ConfirmPassword")}
                    ></Field>
                  </Box>
                </Grid>
              </Grid>
              <div className={classes.actions}>
                {!isLoading && <Controls.Button type="submit" text={t("Authentication.ResetPassword")} />}
              </div>
            </Form>
          </Formik>
          <Snackbar
            className={classes.snackBar}
            open={isSent.trigger}
            autoHideDuration={6000}
            onClose={closeSnackBarHandle}
          >
            <Controls.Alert onClose={closeSnackBarHandle} sx={{ width: "100%" }}>
              {isSent.message}
            </Controls.Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPassword;
