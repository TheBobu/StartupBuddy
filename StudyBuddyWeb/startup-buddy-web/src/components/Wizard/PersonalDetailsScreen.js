import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField, Select } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext } from "react";
import { Grid, MenuItem } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";

const ValidationSchema = () => {
  return Yup.object().shape({
    FirstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
    LastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
    Age: Yup.number().required(i18n.t("General.RequiredField")).required(i18n.t("General.RequiredField")),
    CNP: Yup.string().required(i18n.t("General.RequiredField")),
    Serie: Yup.string().max(2, "Too Long!").required(i18n.t("General.RequiredField")),
    NR: Yup.number().required(i18n.t("General.RequiredField")),
    Address: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
    Education: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
    NivelExperientaAntreprenoriat: Yup.number().required(i18n.t("General.RequiredField")),
  });
};

const InitialValues = {
    FirstName: "",
    LastName: "",
    Age: "",
    CNP: "",
    Serie: "",
    NR: "",
    Address: "",
    Education: "",
    NivelExperientaAntreprenoriat: ""
  };

const PersonalDetailsScreen = () => {
    const { t } = useContext(TranslationContext);
    const submitHandler = (values) => {
        console.log(values);
    }
    return (
    <Card>
      <CardContent>
        <h1>Hello World</h1>
        <Formik
        initialValues={InitialValues}
        validationSchema={ValidationSchema}
        onSubmit={submitHandler}>
          <Form autoComplete="off">
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.FirstName)}
                    placeholder="First Name"
                    component={TextField}
                    name="FirstName"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.LastName)}
                    placeholder="Last Name"
                    component={TextField}
                    name="LastName"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.Age)}
                    placeholder="Age"
                    component={TextField}
                    name="Age"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.CNP)}
                    placeholder="CNP"
                    component={TextField}
                    name="CNP"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.Serie)}
                    placeholder="Serie"
                    component={TextField}
                    name="Serie"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.NR)}
                    placeholder="NR"
                    component={TextField}
                    name="NR"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.Address)}
                    placeholder="Address"
                    component={TextField}
                    name="Address"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.Education)}
                    placeholder="Education"
                    component={TextField}
                    name="Education"
                  ></Field>
                    <Field
                    style={{ width: "100%" }}
                    label={t("PersonalDetailsScreen.NivelExperientaAntreprenoriat")}
                    name="NivelExperientaAntreprenoriat"
                    placeholder={t("PersonalDetailsScreen.NivelExperientaAntreprenoriat")}
                    component={Select}
                  >
                    <MenuItem value={1}>{t("PersonalDetailsScreen.Beginner")}</MenuItem>
                    <MenuItem value={2}>{t("PersonalDetailsScreen.Medium")}</MenuItem>
                    <MenuItem value={3}>{t("PersonalDetailsScreen.Advanced")}</MenuItem>
                  </Field>
                </Box>
              </Grid>
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

export default PersonalDetailsScreen;