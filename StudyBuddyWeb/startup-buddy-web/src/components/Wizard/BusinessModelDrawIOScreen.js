import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Form, Formik } from "formik";
import { TranslationContext } from "../../store/translation-context";
import { useContext } from "react";
import { Grid } from "@mui/material";
import Controls from "../Controls/Controls"
import classes from '../Wizard/Wizard.module.css';
import { useHistory } from "react-router-dom";


const BusinessModelDrawIOScreen = () => {
  const history = useHistory();

    const { t } = useContext(TranslationContext);
    const submitHandler = (values) => {
        console.log(values);
        history.push('/fundRaisingScreen');
    }
    return (
        <Card className={classes.wizard_container}>
        <CardContent>
            <h1>Business Model Diagram</h1>
            <Formik
        onSubmit={submitHandler}>
          <Form autoComplete="off">
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
            <div className={classes.field}>
                <a href="https://app.diagrams.net">DrawIO</a> <br></br>
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
    );};

export default BusinessModelDrawIOScreen;