import React from "react";
import { Field, Form, Formik } from "formik";
import { Box, Card, CardContent } from "@mui/material";
import useAuth from "../useAuth";
import { TextField } from "formik-mui"
import { Grid } from "@mui/material";
import LoginValidationSchema from "./LoginValidationSchema";
import { Link } from "react-router-dom";
import Controls from "../../Controls/Controls"
import classes from "../Authentication.module.css";
const LoginForm = () => {
  const { t } = useAuth();
  const { loginInitialValues, isSent, closeSnackBarHandle, submitHandlerLogin } = useAuth();

  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={LoginValidationSchema}
          onSubmit={submitHandlerLogin}
        >
          <Form autoComplete="off">
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                  <Field
                    style={{ width: "100%" }}
                    label={t("Authentication.Email")}
                    placeholder={t("Authentication.EmailPlaceholder")}
                    component={TextField}
                    name="email"
                  ></Field>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingBottom={3}>
                  <Field
                    style={{ width: "100%" }}
                    label={t("Authentication.Password")}
                    name="password"
                    type="password"
                    component={TextField}
                  ></Field>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.lostPassword}>
              <Link
                to={{
                  pathname: "/lost-password",
                }}
              >
                {t("Authentication.LostPassword")}
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Controls.Button type="submit" text="Submit" />
            </Grid>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
