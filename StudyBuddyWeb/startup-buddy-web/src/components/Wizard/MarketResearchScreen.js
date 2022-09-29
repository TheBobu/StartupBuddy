import useHttp from '../http/useHttp';
import React, { useState } from 'react';
import {Card, CardContent, Box} from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useEffect } from 'react';
import { Grid } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";
import classes from '../Wizard/Wizard.module.css';

const ValidationSchema = () => {
    return Yup.object().shape({
      Demand: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Interest: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
    });
  };

    const MarketResearchScreen = () => {
        const { t } = useContext(TranslationContext);
        const submitHandler = (values) => {
            console.log(values);
            sendData(values);
        }
        const marketResearchData = {
          Demand: '',
          Interest: '',
          };
          const [InitialValues, setInitialValues] = useState(marketResearchData);
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
            url: '/MarketResearch',
            headers: {
              'content-type': 'application/json',
            },
          });
        
          const { response: responseGet } = useHttp({
            method: 'get',
            url: '/MarketResearch',
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
            <h1>Market Research</h1>
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
                        style={{ width: '100%' }}
                        label={t('MarketResearchScreen.Demand')}
                        placeholder={t('MarketResearchScreen.Demand')}
                        component={TextField}
                        onChange={handleChange}
                        value={values.Demand || ""}
                        name="Demand"
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
                        onChange={handleChange}
                        value={values.Interest || ""}
                        name="Interest"
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
            </form>
          );
        }}
            </Formik>
          </CardContent>
        </Card>
        );
    };
    
export default MarketResearchScreen;