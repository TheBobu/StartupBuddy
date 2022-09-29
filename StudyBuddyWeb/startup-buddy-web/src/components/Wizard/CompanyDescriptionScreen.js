import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField, Select, Checkbox } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, MenuItem } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";
import classes from '../Wizard/Wizard.module.css';

const ValidationSchema = () => {
    return Yup.object().shape({
      Name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Domain: Yup.number().required(i18n.t("General.RequiredField")),
      MainActivity: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      SecondaryActivity: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Description: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      ExperienceLevel: Yup.number().required(i18n.t("General.RequiredField")),
      NumberOfEmployees: Yup.number().required(i18n.t("General.RequiredField")),
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
    SecondaryActivity: "",
    Description: "",
    ExperienceLevel: "",
    NumberOfEmployees: "",
    BusinessEmail: "",
    Phone: "",
    CUI: "",
    DateFounded: "",
    SocialDomain: "",
    ONRC: ""
  };

  const CompanyDescriptionScreen = () => {
    const { t } = useContext(TranslationContext);
    const history = useHistory();
    const [isAccountantChecked, setIsAccountantChecked] = useState(false);
    const [isCompanyChecked, setIsCompanyChecked] = useState(false);
    const [isStockMarketChecked, setIsStockMarketChecked] = useState(false);
    const [isEmployeesChecked, setIsEmployeesChecked] = useState(true);
    const submitHandler = (values) => {
        console.log(values);
        history.push('/productDescriptionScreen');
    }
    return (
    <Card className={classes.wizard_container}>
      <CardContent>
        <h1>Company Description</h1>
        <Formik
        initialValues={InitialValues}
        validationSchema={ValidationSchema}
        onSubmit={submitHandler}>
          <Form autoComplete="off">
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Name')}
                    placeholder={t('CompanyDescriptionScreen.Name')}
                    component={TextField}
                    name="Name"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Domain')}
                    name="Domain"
                    placeholder={t('CompanyDescriptionScreen.Domain')}
                    component={Select}
                  >
                    <MenuItem value={1}>Societatea cu Raspundere Limitata (SRL)</MenuItem>
                    <MenuItem value={2}>Societatea pe Actiuni (SA)</MenuItem>
                    <MenuItem value={3}>Societatea in nume colectiv (SNC)</MenuItem>
                    <MenuItem value={4}>Societatea in comandita simpla (SCS)</MenuItem>
                    <MenuItem value={5}>Societatea in comandita pe actiuni (SCA)</MenuItem>
                    <MenuItem value={6}>Persoana fizica autorizata (PFA)</MenuItem>
                    <MenuItem value={7}>Intreprindere individuala (II)</MenuItem>
                    <MenuItem value={8}>Organizatie non-guvernamentala (ONG)</MenuItem>
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.MainActivity')}
                    placeholder={t('CompanyDescriptionScreen.MainActivity')}
                    component={TextField}
                    name="MainActivity"
                  ></Field>
                  <a href="https://caen.ro">Coduri CAEN</a>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.SecondaryActivity')}
                    placeholder={t('CompanyDescriptionScreen.SecondaryActivity')}
                    component={TextField}
                    name="SecondaryActivity"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Description')}
                    placeholder={t('CompanyDescriptionScreen.Description')}
                    component={TextField}
                    name="Description"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.ExperienceLevel')}
                    placeholder={t('CompanyDescriptionScreen.ExperienceLevel')}
                    name="ExperienceLevel"
                    component={Select}
                  >
                    <MenuItem value={1}>Beginner</MenuItem>
                    <MenuItem value={2}>Advanced</MenuItem>
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Accountant')}
                    name="Accountant"
                    component={Checkbox}
                    value={isAccountantChecked}
                    onChange={e=>{setIsAccountantChecked(e.target.checked)}}
                    
                >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.StockMarket')}
                    name="StockMarket"
                    component={Checkbox}
                    value={isStockMarketChecked}
                    onChange={e=>{setIsStockMarketChecked(e.target.checked)}}
                    
                >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Employees')}
                    name="Employees"
                    component={Checkbox}
                    value={isEmployeesChecked}
                    onChange={e=>{setIsEmployeesChecked(e.target.checked)}}
                    
                >
                  </Field>
                  </div>
                  {isEmployeesChecked && <div>
                    <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.NumberOfEmployees')}
                    placeholder={t('CompanyDescriptionScreen.NumberOfEmployees')}
                    component={TextField}
                    name="NumberOfEmployees"
                  ></Field>
                  </div></div>}
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.BusinessEmail')}
                    placeholder={t('CompanyDescriptionScreen.BusinessEmail')}
                    component={TextField}
                    name="BusinessEmail"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Phone')}
                    name="Phone"
                    placeholder={t('CompanyDescriptionScreen.Phone')}
                    component={TextField}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.FoundedCompany')}
                    name="FoundedCompany"
                    component={Checkbox}
                    value={isCompanyChecked}
                    onChange={e=>{setIsCompanyChecked(e.target.checked)}}
                    
                >
                  </Field>
                  </div>
                  {isCompanyChecked && <div>
                    <div className={classes.field}>
                    <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.CUI')}
                    name={t('CompanyDescriptionScreen.CUI')}
                    placeholder="CUI"
                    component={TextField}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.DateFounded')}
                    name={t('CompanyDescriptionScreen.DateFounded')}
                    placeholder="DateFounded"
                    component={TextField}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.SocialDomain')}
                    name={t('CompanyDescriptionScreen.SocialDomain')}
                    placeholder="SocialDomain"
                    component={TextField}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.ONRC')}
                    name="ONRC"
                    placeholder={t('CompanyDescriptionScreen.ONRC')}
                    component={TextField}
                  >
                  </Field>
                  </div>
                  </div> }
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controls.Button
                className={classes.submit_button}
                type='submit'
                text={t('General.Next')}
              />
            </Grid>
          </Form>
        </Formik>
      </CardContent>
    </Card>
    );
};

export default CompanyDescriptionScreen;

