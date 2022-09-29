import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField, Select, Checkbox } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useState } from "react";
import { Grid, MenuItem } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";

const ValidationSchema = () => {
    return Yup.object().shape({
      Name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Domain: Yup.number().required(i18n.t("General.RequiredField")),
      MainActivity: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Description: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      ExperienceLevel: Yup.number().required(i18n.t("General.RequiredField")),
      NumberOfEmployees: Yup.number().required(i18n.t("General.RequiredField")),
      Members: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      BusinessEmail: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      Phone: Yup.number().required(i18n.t("General.RequiredField")),
      CUI: Yup.number().required(i18n.t("General.RequiredField")),
      DateFounded: Yup.number().required(i18n.t("General.RequiredField")),
      SocialDomain: Yup.string().required(i18n.t("General.RequiredField")),
      ONRC: Yup.string().required(i18n.t("General.RequiredField")),
    });
  };

  const InitialValues = {
    Name: "",
    Domain: "",
    MainActivity: "",
    Description: "",
    ExperienceLevel: "",
    NumberOfEmployees: "",
    Members: "",
    BusinessEmail: "",
    Phone: "",
    CUI: "",
    DateFounded: "",
    SocialDomain: "",
    ONRC: ""
  };

  const CompanyDescriptionScreen = () => {
    const { t } = useContext(TranslationContext);
    const [isCompanyChecked, setIsCompanyChecked] = useState(false);
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
                    label={t(CompanyDescriptionScreen.Name)}
                    placeholder="Name"
                    component={TextField}
                    name="Name"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.Domain)}
                    name="Domain"
                    placeholder={t(CompanyDescriptionScreen.Domain)}
                    component={Select}
                  >
                    <MenuItem value={1}>Societatea cu Raspundere Limitata (SRL)</MenuItem>
                    <MenuItem value={2}>Societatea pe Actiuni (SA)</MenuItem>
                    <MenuItem value={3}>Societatea in nume colectiv (SNC)</MenuItem>
                    <MenuItem value={4}>Societatea in comandita simpla (SCS)</MenuItem>
                    <MenuItem value={5}>Societatea in comandita pe actiuni (SCA)</MenuItem>
                    <MenuItem value={6}>Grupul de Interes Economic (GIE)</MenuItem>
                    <MenuItem value={7}>Grupul European de Interes Economic (GEIE)</MenuItem>
                    <MenuItem value={8}>Societatea Europeana (SE)</MenuItem>
                    <MenuItem value={9}>Reprezentanta</MenuItem>
                  </Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.MainActivity)}
                    placeholder="MainActivity"
                    component={TextField}
                    name="MainActivity"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.Description)}
                    placeholder="Description"
                    component={TextField}
                    name="Description"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.ExperienceLevel)}
                    placeholder="ExperienceLevel"
                    name="ExperienceLevel"
                    component={Select}
                  >
                    <MenuItem value={1}>Beginner</MenuItem>
                    <MenuItem value={2}>Advanced</MenuItem>
                  </Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.NumberOfEmployees)}
                    placeholder="NumberOfEmployees"
                    component={TextField}
                    name="NumberOfEmployees"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.Members)}
                    placeholder="Members"
                    component={TextField}
                    name="Members"
                  ></Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.BusinessEmail)}
                    placeholder="BusinessEmail"
                    component={TextField}
                    name="BusinessEmail"
                  ></Field>
                    <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.Phone)}
                    name="Phone"
                    placeholder="Phone"
                    component={TextField}
                  >
                  </Field>
                  <Field
                    style={{ width: "100%" }}
                    label="Founded Company"
                    name="Founded Company"
                    component={Checkbox}
                    value={isCompanyChecked}
                    onChange={e=>{setIsCompanyChecked(e.target.checked)}}
                    
                >
                  </Field>
                  {isCompanyChecked && <div>
                    <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.CUI)}
                    name="CUI"
                    placeholder="CUI"
                    component={TextField}
                  >
                  </Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.DateFounded)}
                    name="DateFounded"
                    placeholder="DateFounded"
                    component={TextField}
                  >
                  </Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.SocialDomain)}
                    name="SocialDomain"
                    placeholder="SocialDomain"
                    component={TextField}
                  >
                  </Field>
                  <Field
                    style={{ width: "100%" }}
                    label={t(CompanyDescriptionScreen.ONRC)}
                    name="ONRC"
                    placeholder="ONRC"
                    component={TextField}
                  >
                  </Field>
                  </div> }
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

export default CompanyDescriptionScreen;

