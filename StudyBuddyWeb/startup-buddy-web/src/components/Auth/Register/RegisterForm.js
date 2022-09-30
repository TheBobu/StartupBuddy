import React from "react";
import useAuth from "../useAuth";
import { Box, Card, CardContent } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Controls from "../../Controls/Controls";
import classes from "../Authentication.module.css";

export function FormikStep({ children }) {
  return <>{children}</>;
}

const RegisterForm = () => {
  const { t } = useAuth();
  const { registrationInitialValues, isSent, closeSnackBarHandle, submitHandlerRegister } = useAuth();

  return (
    <Card>
      <CardContent>
        <Formik initialValues={registrationInitialValues} onSubmit={submitHandlerRegister}>
        <Form autoComplete="off">
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3}>
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
            <Grid item xs={12}>
              <Controls.Button type="submit" text="Submit" />
            </Grid>
            </Grid>
        <Snackbar className={classes.snackBar} open={isSent} autoHideDuration={6000} onClose={closeSnackBarHandle}>
          <Controls.Alert onClose={closeSnackBarHandle} sx={{ width: "100%" }}>
            {t("Authentication.ConfirmEmail")}
          </Controls.Alert>
        </Snackbar>
        </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
