import React, { useState } from 'react';
import useHttp from '../http/useHttp';
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
import { useHistory } from "react-router-dom";

const ValidationSchema = () => {
    return Yup.object().shape({
      Name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      ProductType: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Description: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required(i18n.t("General.RequiredField"))
    });
  };

const ProductDescriptionScreen = () => {
  const history = useHistory();
    const { t } = useContext(TranslationContext);
    const submitHandler = (values) => {
        console.log(values);
        history.push('/marketResearchScreen');
        sendData(values);
    }
    const productDescriptionData = {
      Name: '',
      ProductType: '',
      Description: ''
      };
      const [InitialValues, setInitialValues] = useState(productDescriptionData);
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
      <h1>Product Description</h1>
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
                    style={{ width: "100%" }}
                    label={t('ProductDescriptionScreen.Name')}
                    placeholder="Name"
                    component={TextField}
                    onChange={handleChange}
                    value={values.Name || ""}
                    name="Name"
                    multiline
                    rows={4}
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('ProductDescriptionScreen.ProductType')}
                    placeholder="ProductType"
                    component={TextField}
                    onChange={handleChange}
                    value={values.ProductType || ""}
                    name="ProductType"
                    multiline
                    rows={4}
                  ></Field>
                  </div>
                  <div className={classes.field}>
                  <Field
                    style={{ width: "100%" }}
                    label={t('ProductDescriptionScreen.Description')}
                    placeholder="Description"
                    component={TextField}
                    onChange={handleChange}
                    value={values.Description || ""}
                    name="Description"
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

export default ProductDescriptionScreen;