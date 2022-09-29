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
    Series: Yup.string().max(2, "Too Long!").required(i18n.t("General.RequiredField")),
    Number: Yup.number().required(i18n.t("General.RequiredField")),
    Address: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
    Education: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
    ExperienceLevel: Yup.number().required(i18n.t("General.RequiredField")),
  });
};

const InitialValues = {
    FirstName: "",
    LastName: "",
    Age: "",
    CNP: "",
    Series: "",
    Number: "",
    Address: "",
    Education: "",
    ExperienceLevel: ""
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
                    label={t(PersonalDetailsScreen.Series)}
                    placeholder="Series"
                    component={TextField}
                    name="Series"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(PersonalDetailsScreen.Number)}
                    placeholder="Number"
                    component={TextField}
                    name="Number"
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
                    label={t(PersonalDetailsScreen.ExperienceLevel)}
                    name="ExperienceLevel"
                    placeholder={t(PersonalDetailsScreen.ExperienceLevel)}
                    component={Select}
                  >
                    <MenuItem value={1}>{t(PersonalDetailsScreen.Beginner)}</MenuItem>
                    <MenuItem value={2}>{t(PersonalDetailsScreen.Medium)}</MenuItem>
                    <MenuItem value={3}>{t(PersonalDetailsScreen.Advanced)}</MenuItem>
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