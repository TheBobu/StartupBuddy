import React from 'react';
import {Card, CardContent, Box, FormControlLabel} from "@mui/material";
import { Field, Formik } from "formik";
import { TextField, Select} from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, MenuItem, FormGroup} from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";
import classes from '../Wizard/Wizard.module.css';
import useHttp from '../http/useHttp';
import Checkbox from '@mui/material/Checkbox';

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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { t } = useContext(TranslationContext);
    const history = useHistory();
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
      url: '/Company',
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const { response: responseGet } = useHttp({
      method: 'get',
      url: '/Company',
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
                  id="name"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Name')}
                    placeholder={t('CompanyDescriptionScreen.Name')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.name || ""}
                    name="name"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="domain"
                    formControl={{sx:{ width: '100%'}}}
                    label={t('CompanyDescriptionScreen.Domain')}
                    name="domain"
                    placeholder={t('CompanyDescriptionScreen.Domain')}
                    component={Select}
                    onChange={handleChange}
                    value={values.domain || ""}
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
                  id="mainActivity"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.MainActivity')}
                    placeholder={t('CompanyDescriptionScreen.MainActivity')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.mainActivity || ""}
                    name="mainActivity"
                  ></Field>
                  <a href="https://caen.ro">Coduri CAEN</a>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="secondActivity"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.SecondaryActivity')}
                    placeholder={t('CompanyDescriptionScreen.SecondaryActivity')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.secondActivity || ""}
                    name="secondActivity"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="description"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Description')}
                    placeholder={t('CompanyDescriptionScreen.Description')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.description || ""}
                    name="description"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="experienceLevel"
                    formControl={{sx:{ width: '100%'}}}
                    label={t('CompanyDescriptionScreen.ExperienceLevel')}
                    placeholder={t('CompanyDescriptionScreen.ExperienceLevel')}
                    name="experienceLevel"
                    component={Select}
                    onChange={handleChange}
                    value={values.experienceLevel || ""}
                  >
                    <MenuItem value={1}>Beginner</MenuItem>
                    <MenuItem value={2}>Advanced</MenuItem>
                  </Field>
                  </div>
                  <Checkbox 
                  id="accountant"
                    name='accountant' 
                    checked={isAccountantChecked} 
                    onChange={e=>{setIsAccountantChecked(e.target.checked)}} /> 
                    <label style={{ color: 'black' }} htmlFor='accountant'> Do you need an accountant? </label>
                  <Checkbox 
                  id="stockMarket"
                    name='stockMarket' 
                    checked={isStockMarketChecked} 
                    onChange={e=>{setIsStockMarketChecked(e.target.checked)}} /> 
                    <label style={{ color: 'black' }} htmlFor='stockMarket'> Do you want to be listed on stock market? </label>
                  <Checkbox 
                    name='employees' 
                    checked={isEmployeesChecked} 
                    onChange={e=>{setIsEmployeesChecked(e.target.checked)}} /> 
                    <label style={{ color: 'black' }} htmlFor='employees'> Will you have employees? </label>
                  {isEmployeesChecked && <div className={classes.field}>
                    <div className={classes.field}>
                  <Field
                  id="numberOfEmployees"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.NumberOfEmployees')}
                    placeholder={t('CompanyDescriptionScreen.NumberOfEmployees')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.numberOfEmployees || ""}
                    name="numberOfEmployees"
                  ></Field>
                  </div></div>}
                  <div className={classes.field}>
                  <Field
                  id="businessEmail"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.BusinessEmail')}
                    placeholder={t('CompanyDescriptionScreen.BusinessEmail')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.businessEmail || ""}
                    name="businessEmail"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="phone"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.Phone')}
                    name="phone"
                    placeholder={t('CompanyDescriptionScreen.Phone')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.phone || ""}
                  >
                  </Field>
                  </div>
                  <Checkbox 
                  id="foundedCompany"
                    name='foundedCompany' 
                    checked={isCompanyChecked} 
                    onChange={e=>{setIsCompanyChecked(e.target.checked)}} /> 
                    <label style={{ color: 'black' }} htmlFor='foundedCompany'> Is Company Founded? </label>
                  {isCompanyChecked && <div>
                    <div className={classes.field}>
                    <Field
                    id="cui"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.CUI')}
                    name={t('CompanyDescriptionScreen.CUI')}
                    placeholder="cui"
                    component={TextField}
                    onChange={handleChange}
                    value={values.cui || ""}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="dateFounded"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.DateFounded')}
                    name='dateFounded'
                    placeholder="dateFounded"
                    component={TextField}
                    onChange={handleChange}
                    value={values.dateFounded || ""}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="socialDomain"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.SocialDomain')}
                    name="socialDomain"
                    placeholder="SocialDomain"
                    component={TextField}
                    onChange={handleChange}
                    value={values.socialDomain || ""}
                  >
                  </Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="onrc"
                    style={{ width: "100%" }}
                    label={t('CompanyDescriptionScreen.ONRC')}
                    name="onrc"
                    placeholder={t('CompanyDescriptionScreen.ONRC')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.onrc || ""}
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
                onClick={()=>{history.push('/productDescriptionScreen')}}
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

