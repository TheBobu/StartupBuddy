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
      WebPage: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      Facebook: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      Instagram: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
      Linkedin: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField")),
    });
  };

const SocialMediaScreen = () => {
  const history = useHistory();
    const { t } = useContext(TranslationContext);
    const submitHandler = (values) => {
        console.log(values);
        history.push('/pitchScreen');
        sendData(values);
    }
    const socialMediaData = {
      WebPage: '',
      Facebook: '',
      Instagram: '',
      Linkedin: ''
      };
      const [InitialValues, setInitialValues] = useState(socialMediaData);
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
            url: '/SocialMedia',
            headers: {
              'content-type': 'application/json',
            },
          });
        
          const { response: responseGet } = useHttp({
            method: 'get',
            url: '/SocialMedia',
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
        <h1>Social Media Pages</h1>
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
                id="webPage"
                    style={{ width: "100%" }}
                    label={"Web Page"}
                    component={TextField}
                    onChange={handleChange}
                    value={values.webPage || ""}
                    name="webPage"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="facebook"
                    style={{ width: "100%" }}
                    label={"Facebook"}
                    component={TextField}
                    onChange={handleChange}
                    value={values.facebook || ""}
                    name="facebook"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="instagram"
                    style={{ width: "100%" }}
                    label={"Instagram"}
                    component={TextField}
                    onChange={handleChange}
                    value={values.instagram || ""}
                    name="instagram"
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                  id="linkedin"
                    style={{ width: "100%" }}
                    label={"Linkedin"}
                    component={TextField}
                    onChange={handleChange}
                    value={values.linkedin || ""}
                    name="linkedin"
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

export default SocialMediaScreen;