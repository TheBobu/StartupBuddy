import useHttp from '../http/useHttp';
import React, { useState } from 'react';
import {Card, CardContent, Box} from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";
import classes from '../Wizard/Wizard.module.css';
import { useHistory } from "react-router-dom";

const ValidationSchema = () => {
    return Yup.object().shape({
      Problem: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      ProductSolution: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      PrincipalClients: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Money: Yup.number().required(i18n.t('General.RequiredField'))
    });
  };

const BusinessModelQuestionsScreen = () => {
  const history = useHistory();
    const { t } = useContext(TranslationContext);
    const submitHandler = (values) => {
        console.log(values);
        
    }
    const businessModelQuestionsData = {
      Problem: '',
      ProductSolution: '',
      PrincipalClients: '',
      Money: ''
    };
    const [InitialValues, setInitialValues] = useState(businessModelQuestionsData);
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
            url: '/BusinessModel',
            headers: {
              'content-type': 'application/json',
            },
          });
        
          const { response: responseGet } = useHttp({
            method: 'get',
            url: '/BusinessModel',
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
        <h1>Business Model Questions</h1>
        <Formik
        initialValues={InitialValues}
        validationSchema={ValidationSchema}
    
        enableReinitialize={true}>
          {({ values,handleChange}) => {
            return(
          <form>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
                <div className={classes.field}>
                <Field
                id="problem"
                    style={{ width: "100%" }}
                    label={t('BusinessModelQuestionsScreen.Problem')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.problem || ""}
                    name="problem"
                    multiline
                    rows={4}
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="productSolution"
                    style={{ width: "100%" }}
                    label={t('BusinessModelQuestionsScreen.ProductSolution')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.productSolution || ""}
                    name="productSolution"
                    multiline
                    rows={4}
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="principalClients"
                    style={{ width: "100%" }}
                    label={t('BusinessModelQuestionsScreen.PrincipalClients')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.principalClients || ""}
                    name="principalClients"
                    multiline
                    rows={4}
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="money"
                    style={{ width: "100%" }}
                    label={t('BusinessModelQuestionsScreen.Money')}
                    component={TextField}
                    onChange={handleChange}
                    value={values.money || ""}
                    name="money"
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
                onClick={()=>{history.push('/businessModelDrawIOScreen');}}
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

export default BusinessModelQuestionsScreen;