import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField, Select } from 'formik-mui';
import { TranslationContext } from '../../store/translation-context';
import { useContext } from 'react';
import { Grid, MenuItem } from '@mui/material';
import Controls from '../Controls/Controls';
import * as Yup from 'yup';
import i18n from 'i18next';
import classes from '../Wizard/Wizard.module.css';

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
      .required(i18n.t('General.RequiredField'))
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

const InitialValues = {
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

const PersonalDetailsScreen = () => {
  const { t } = useContext(TranslationContext);
  const submitHandler = (values) => {
    console.log(values);
  };
  return (
    <Card className={classes.wizard_container}>
      <CardContent>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={submitHandler}
        >
          <Form autoComplete='off'>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                  <div className={classes.field}>
                    <Field
                      style={{ width: '100%' }}
                      label={t('Authentication.FirstName')}
                      component={TextField}
                      name='FirstName'
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                      style={{ width: '100%' }}
                      label={t('Authentication.LastName')}
                      component={TextField}
                      name='LastName'
                    ></Field>
                  </div>
                  <div className={classes.field}>              
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Age')}
                      component={TextField}
                      name='Age'
                    ></Field>
                  </div>
                  <div className={classes.field}>              
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.CNP')}
                      component={TextField}
                      name='CNP'
                    ></Field>
                  </div>
                  <div className={classes.field}>              
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Series')}
                      component={TextField}
                      name='Series'
                    ></Field>
                  </div>
                  <div className={classes.field}>              
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Number')}
                      component={TextField}
                      name='Number'
                    ></Field>
                  </div>
                  <div className={classes.field}>          
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Address')}
                      component={TextField}
                      name='Address'
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.Education')}
                      component={TextField}
                      name='Education'
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                      style={{ width: '100%' }}
                      label={t('PersonalDetailsScreen.ExperienceLevel')}
                      name='ExperienceLevel'
                      component={Select}
                    >
                      <MenuItem value={1}>
                        {t("PersonalDetailsScreen.Beginner")}
                      </MenuItem>
                      <MenuItem value={2}>
                        {t("PersonalDetailsScreen.Medium")}
                      </MenuItem>
                      <MenuItem value={3}>
                        {t("PersonalDetailsScreen.Advanced")}
                      </MenuItem>
                    </Field>
                  </div>
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

export default PersonalDetailsScreen;
