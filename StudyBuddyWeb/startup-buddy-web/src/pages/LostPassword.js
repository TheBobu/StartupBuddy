import { useState, useContext } from "react";
import classes from "../Auth/Authentication.module.css";
import { TranslationContext } from "../../store/translation-context";
import { Card, CardContent } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import Snackbar from "@mui/material/Snackbar";
import Controls from "../Controls/Controls";

const LostPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useContext(TranslationContext);
  const [isSent, setIsSent] = useState(false);
  const baseURL =  process.env.REACT_APP_BASE_URL;

  const closeSnackBarHandle = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSent(false);
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    let url;

    url = baseURL +"/authentication/lost-password/";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: `"${values.email}"`,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          setIsSent(true);
        } else {
          return res.json().then((data) => {
            let errorMessage;
            if (res && res.error && res.error.message) {
              errorMessage = res.error.value;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {}) 
      .catch((err) => {
        alert(err.message);
      });
  };

  const emailValidationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().email(t("Authentication.InvalidEmail")).required(t("Authentication.RequiredField")),
    });
  };

  return (
    <section className={classes.auth}>
      <span>{t("Authentication.LostPasswordMsg")}</span>
      <Card>
        <CardContent>
          <Formik initialValues={{ email: "" }} validationSchema={emailValidationSchema} onSubmit={submitHandler}>
            <Form autoComplete="off">
              <Field
                label={t("Authentication.Email")}
                style={{ width: "100%" }}
                name="email"
                type="email"
                component={TextField}
                placeholder={t("Authentication.Email")}
              ></Field>
              <div className={classes.actions}>
                {!isLoading && <Controls.Button type="submit" text={t("Authentication.ResetPassword")} />}
              </div>
            </Form>
          </Formik>
          <Snackbar className={classes.snackBar} open={isSent} autoHideDuration={6000} onClose={closeSnackBarHandle}>
            <Controls.Alert onClose={closeSnackBarHandle} sx={{ width: "100%" }}>
              {t("Authentication.LostPasswordConfirmation")}
            </Controls.Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </section>
  );
};
export default LostPassword;
