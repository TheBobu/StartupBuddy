import React from 'react';
import {Card, CardContent, Box} from "@mui/material";
import { Field, Formik } from "formik";
import { TextField, Select, Checkbox } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useState, useEffect } from "react";
import { Grid, MenuItem } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";
import classes from '../Wizard/Wizard.module.css';
import useHttp from '../http/useHttp';

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

  const CompanyDescriptionScreen = () => {
    const { t } = useContext(TranslationContext);
    const [isAccountantChecked, setIsAccountantChecked] = useState(false);
    const [isCompanyChecked, setIsCompanyChecked] = useState(false);
    const [isStockMarketChecked, setIsStockMarketChecked] = useState(false);
    const [isEmployeesChecked, setIsEmployeesChecked] = useState(false);
    const submitHandler = (values) => {
      console.log(values);
      sendData(values);
    };
  
    const companyDescriptionData = {
      Name: '',
      Domain: '',
      MainActivity: '',
      SecondaryActivity: '',
      Description: '',
      ExperienceLevel: '',
      NumberOfEmployees: '',
      Employees: '',
      StockMarket: '',
      Accountant: '',
      BusinessEmail: '',
      Phone: '',
      CUI: '',
      DateFounded: '',
      SocialDomain: '',
      ONRC: '',
      FoundedCompany: ''
    };
    const [InitialValues, setInitialValues] = useState(companyDescriptionData);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInitialValues({
        ...InitialValues,
        [name]: value,
      });
      console.log(e.target)
    };
  
    const { fetchData: sendData, response: responseSend } = useHttp({
      autoRun: false,
      method: 'post',
      url: '/CompanyDescription',
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const { response: responseGet } = useHttp({
      method: 'get',
      url: '/CompanyDescription',
    });
  
    useEffect(() => {
      if (responseGet != null) {
        console.log(responseGet);
        setInitialValues(responseGet);
      }
      return () => {};
    }, [responseGet]);

    return (
    <Card className={classes.wizard_container}>
      <CardContent>
        <h1>Company Description</h1>
        <Formik
        initialValues={InitialValues}
        validationSchema={ValidationSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}>
           {({ values,handleChange}) => {
            return(
          <form>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Name')}
                    placeholder={t('CompanyDescriptionScreen.Name')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.Name || ""}
                    name="Name"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    formControl={{sx:{ width: '100%'}}}
                    label={t('CompanyDescriptionScreen.Domain')}
                    name="Domain"
                    placeholder={t('CompanyDescriptionScreen.Domain')}
                    component={Select}
                    onChange={handleChange}
                    value={values.Domain || ""}
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
                    onChange={handleChange}
                    value={values.MainActivity || ""}
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
                    onChange={handleChange}
                    value={values.SecondaryActivity || ""}
                    name="SecondaryActivity"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Description')}
                    placeholder={t('CompanyDescriptionScreen.Description')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.Description || ""}
                    name="Description"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    formControl={{sx:{ width: '100%'}}}
                    label={t('CompanyDescriptionScreen.ExperienceLevel')}
                    placeholder={t('CompanyDescriptionScreen.ExperienceLevel')}
                    name="ExperienceLevel"
                    component={Select}
                    onChange={handleChange}
                    value={values.ExperienceLevel || ""}
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
                    label={t('CompanyDescriptionScreen.Employees')}
                    name="Employees"
                    component={Checkbox}
                    value={isEmployeesChecked}
                    onChange={e=>{setIsEmployeesChecked(e.target.checked)}}
                    
                >
                  </Field>
                  </div>
                  {!isEmployeesChecked && <div>
                    <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.NumberOfEmployees')}
                    placeholder={t('CompanyDescriptionScreen.NumberOfEmployees')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.NumberOfEmployees || ""}
                    name="NumberOfEmployees"
                  ></Field>
                  </div></div>}
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.BusinessEmail')}
                    placeholder={t('CompanyDescriptionScreen.BusinessEmail')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.BusinessEmail || ""}
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
                    onChange={handleChange}
                    value={values.Phone || ""}
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
                    onChange={handleChange}
                    value={values.CUI || ""}
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
                    onChange={handleChange}
                    value={values.DateFounded || ""}
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
                    onChange={handleChange}
                    value={values.SocialDomain || ""}
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
                    onChange={handleChange}
                    value={values.ONRC || ""}
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
            </form>
          );
        }}
        </Formik>
      </CardContent>
    </Card>
    );
};

export default CompanyDescriptionScreen;

