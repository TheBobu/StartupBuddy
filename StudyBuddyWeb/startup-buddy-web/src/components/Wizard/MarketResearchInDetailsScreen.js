import React, { useState } from 'react';
import {Card, CardContent, Box} from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext, useEffect} from "react";
import { Grid } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";
import classes from '../Wizard/Wizard.module.css';
import { useHistory } from "react-router-dom";
import useHttp from '../http/useHttp';


const ValidationSchema = () => {
    return Yup.object().shape({
      BusinessArea: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Competitors: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Revenue: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Differentiation: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField"))
    });
  };

    const MarketResearchInDetailsScreen = () => {
      const history = useHistory();
        const { t } = useContext(TranslationContext);
        const submitHandler = (values) => {
            console.log(values);
            sendData(values);
            
        }
        const marketResearchInDetailsData = {
          BusinessArea: '',
          Competitors: '',
          Revenue: '',
          Differentiation: '',
          };
          const [InitialValues, setInitialValues] = useState(marketResearchInDetailsData);
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
                    id="businessArea"
                        style={{ width: "100%" }}
                        label={t('MarketResearchInDetailsScreen.BusinessArea')}
                        placeholder="BusinessArea"
                        component={TextField}
                        onChange={handleChange}
                        value={values.businessArea || ""}
                        name="businessArea"
                        multiline
                        rows={2}
                      ></Field>
                      </div>
                      <div className={classes.field}>
                      <Field
                      id="competitors"
                        style={{ width: "100%" }}
                        label={t('MarketResearchInDetailsScreen.Competitors')}
                        placeholder="Competitors"
                        component={TextField}
                        onChange={handleChange}
                        value={values.competitors || ""}
                        name="competitors"
                        multiline
                        rows={2}
                      ></Field>
                      </div>
                      <div className={classes.field}>
                      <Field
                      id="revenue"
                        style={{ width: "100%" }}
                        label={t('MarketResearchInDetailsScreen.Revenue')}
                        placeholder="Revenue"
                        component={TextField}
                        onChange={handleChange}
                        value={values.revenue || ""}
                        name="revenue"
                        multiline
                        rows={2}
                      ></Field>
                      </div>
                      <div className={classes.field}>
                      <Field
                      id="differentiation"
                        style={{ width: "100%" }}
                        label={t('MarketResearchInDetailsScreen.Differentiation')}
                        placeholder="Differentiation"
                        component={TextField}
                        onChange={handleChange}
                        value={values.differentiation || ""}
                        name="differentiation"
                        multiline
                        rows={2}
                      ></Field>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
              <Controls.Button
                className={classes.submit_button}
                onClick={()=>{history.push('/businessModelScreen');}}
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
    
export default MarketResearchInDetailsScreen;