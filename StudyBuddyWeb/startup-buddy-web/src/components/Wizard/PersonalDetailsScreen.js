import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { Field, Formik } from 'formik';
import { TextField, Select } from 'formik-mui';
import { TranslationContext } from '../../store/translation-context';
import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Grid, MenuItem } from '@mui/material';
import Controls from '../Controls/Controls';
import * as Yup from 'yup';
import i18n from 'i18next';
import classes from '../Wizard/Wizard.module.css';
import useHttp from '../http/useHttp';

const ValidationSchema = () => {
  return Yup.object().shape({
    FirstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
    LastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
    Age: Yup.number()
      .required(i18n.t('General.RequiredField')),
    CNP: Yup.string().required(i18n.t('General.RequiredField')),
    Series: Yup.string()
      .max(2, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
    Number: Yup.number().required(i18n.t('General.RequiredField')),
    Address: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
    Education: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
    ExperienceLevel: Yup.number().required(i18n.t('General.RequiredField')),
  });
};

const PersonalDetailsScreen = () => {
  const history = useHistory();
  const { t } = useContext(TranslationContext);
  const submitHandler = (values) => {
    sendData(values);
    history.push("/companyDescriptionScreen");
  };

  const personalData = {
    FirstName: '',
    LastName: '',
    Age: '',
    CNP: '',
    Series: '',
    Number: '',
    Address: '',
    Education: '',
    ExperienceLevel: '',
  };
  const [InitialValues, setInitialValues] = useState(personalData);

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
    url: '/PersonalInfo',
    headers: {
      'content-type': 'application/json',
    },
  });

  const { response: responseGet } = useHttp({
    method: 'get',
    url: '/PersonalInfo',
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
      <h1>Personal Details</h1>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
        enableReinitialize={true}
        onSubmit={submitHandler}>
          {({ values,handleChange}) => {
            return(
          <form>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                  <div className={classes.field}>
                    <Field
                    id="firstName"
                      style={{ width: '100%' }}
                      label={t('Authentication.FirstName')}
                      component={TextField}
                      name='firstName'
                      onChange={handleChange}
                      value={values.firstName}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                      id="lastName"
                      style={{ width: '100%' }}
                      label={t('Authentication.LastName')}
                      component={TextField}
                      name='lastName'
                      onChange={handleChange}
                      value={values.lastName || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="age"
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Age')}
                      component={TextField}
                      name='age'
                      onChange={handleChange}
                      value={values.age || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="cnp"
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.CNP')}
                      component={TextField}
                      name='cnp'
                      onChange={handleChange}
                      value={values.cnp || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="series"
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Series')}
                      component={TextField}
                      name='series'
                      onChange={handleChange}
                      value={values.series || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="number"
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Number')}
                      component={TextField}
                      name='number'
                      onChange={handleChange}
                      value={values.number || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="address"
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Address')}
                      component={TextField}
                      name='address'
                      onChange={handleChange}
                      value={values.address || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="education"
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Education')}
                      component={TextField}
                      name='education'
                      onChange={handleChange}
                      value={values.education || ""}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                    id="experienceLevel"
                      formControl={{ sx: { width: '100%' } }}
                      label={t('PersonalDetailsScreen.ExperienceLevel')}
                      name='experienceLevel'
                      component={Select}
                      onChange={handleChange}
                      value={values.experienceLevel || ""}
                    >
                      <MenuItem value={1}>
                        {t('PersonalDetailsScreen.Beginner')}
                      </MenuItem>
                      <MenuItem value={2}>
                        {t('PersonalDetailsScreen.Advanced')}
                      </MenuItem>
                    </Field>
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controls.Button
              type="submit"
                className={classes.submit_button}
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

export default PersonalDetailsScreen;
