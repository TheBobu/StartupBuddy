import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { Form, Formik } from 'formik';
import { TranslationContext } from '../../store/translation-context';
import { useContext } from 'react';
import { Grid } from '@mui/material';
import Controls from '../Controls/Controls';
import classes from '../Wizard/Wizard.module.css';

const BusinessModelScreen = () => {
    const { t } = useContext(TranslationContext);
    const submitHandler = (values) => {
        console.log(values);
      };
    return (
        <Card className={classes.wizard_container}>
        <CardContent>
        <Formik
          onSubmit={submitHandler}
        >
          <Form autoComplete='off'>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
        <h1>What Is a Business Model?</h1>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
            <div className={classes.field}>
            The term business model refers to a company's plan for making a profit. 
            It identifies the products or services the business plans to sell, its identified target market, and any anticipated expenses. 
            Business models are important for both new and established businesses. They help new, developing companies attract investment, recruit talent, and motivate management and staff.
            Established businesses should regularly update their business model or they'll fail to anticipate trends and challenges ahead. 
            Business models also help investors evaluate companies that interest them and employees understand the future of a company they may aspire to join.
            </div>
            <h1>Guideline</h1>
            <div className={classes.field}>
                <a href="https://fourweekmba.com/business-model-canvas/">Explanations Of Business Model</a> <br></br>
                <a href="https://www.investopedia.com/terms/b/businessmodel.asp">Business Model With Examples and Types</a> <br></br>
                <a href="https://www.sba.gov/business-guide/10-steps-start-your-business">10 Steps to start your business</a>
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
            </Box>
            </Grid>
            </Grid>
            </Form>
            </Formik>
        </CardContent>
        </Card>
    );};

export default BusinessModelScreen;