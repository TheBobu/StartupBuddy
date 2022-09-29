import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { TranslationContext } from '../../store/translation-context';
import { useContext } from 'react';
import { Grid } from '@mui/material';
import Controls from '../Controls/Controls';
import * as Yup from 'yup';
import i18n from 'i18next';
import classes from '../Wizard/Wizard.module.css';
import { useHistory } from "react-router-dom";

const ValidationSchema = () => {
  return Yup.object().shape({
    Demand: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
    Interest: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(i18n.t('General.RequiredField')),
  });
};

const InitialValues = {
  Demand: '',
  Interest: '',
};

const MarketResearchScreen = () => {
  const history = useHistory();
  const { t } = useContext(TranslationContext);
  const submitHandler = (values) => {
    console.log(values);
    history.push('/marketResearchInDetailsScreen');
  };
  return (
    <Card className={classes.wizard_container}>
      <CardContent>
        <h1>Market Research</h1>
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
                      label={t('MarketResearchScreen.Demand')}
                      placeholder={t('MarketResearchScreen.Demand')}
                      component={TextField}
                      name='Demand'
                      multiline
                      rows={4}
                    ></Field>
                  </div>
                  <div className={classes.field}>
                    <Field
                      style={{ width: '100%' }}
                      label={t('MarketResearchScreen.Interest')}
                      placeholder={t('MarketResearchScreen.Interest')}
                      component={TextField}
                      name='Interest'
                      multiline
                      rows={4}
                    ></Field>
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

export default MarketResearchScreen;
