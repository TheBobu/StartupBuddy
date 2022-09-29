import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui"
import { TranslationContext } from "../../store/translation-context";
import { useContext } from "react";
import { Grid } from "@mui/material";
import Controls from "../Controls/Controls"
import * as Yup from "yup";
import i18n from "i18next";

const ValidationSchema = () => {
    return Yup.object().shape({
      BusinessArea: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Competitors: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Revenue: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField")),
      Differentiation: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("General.RequiredField"))
    });
  };

  const InitialValues = {
    BusinessArea: "",
    Competitors: "",
    Revenue: "",
    Differentiation: "",
    };

    const MarketResearchInDetailsScreen = () => {
        const { t } = useContext(TranslationContext);
        const submitHandler = (values) => {
            console.log(values);
        }
        return (
        <Card>
          <CardContent>
            <h1>Hello World</h1>
            <Formik
            initialValues={InitialValues}
            validationSchema={ValidationSchema}
            onSubmit={submitHandler}>
              <Form autoComplete="off">
                <Grid container sx={{ mt: 4 }}>
                  <Grid item xs={12}>
                    <Box paddingBottom={3} sx={{ mr: 2 }}>
                    <Field
                        style={{ width: "100%" }}
                        label={t(MarketResearchInDetailsScreen.BusinessArea)}
                        placeholder="BusinessArea"
                        component={TextField}
                        name="BusinessArea"
                        multiline
                        rows={2}
                      ></Field>
                      <Field
                        style={{ width: "100%" }}
                        label={t(MarketResearchInDetailsScreen.Competitors)}
                        placeholder="Competitors"
                        component={TextField}
                        name="Competitors"
                        multiline
                        rows={2}
                      ></Field>
                      <Field
                        style={{ width: "100%" }}
                        label={t(MarketResearchInDetailsScreen.Revenue)}
                        placeholder="Revenue"
                        component={TextField}
                        name="Revenue"
                        multiline
                        rows={2}
                      ></Field>
                      <Field
                        style={{ width: "100%" }}
                        label={t(MarketResearchInDetailsScreen.Differentiation)}
                        placeholder="Differentiation"
                        component={TextField}
                        name="Differentiation"
                        multiline
                        rows={2}
                      ></Field>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                <Controls.Button type="submit" text="Submit" />
                </Grid>
              </Form>
            </Formik>
          </CardContent>
        </Card>
        );
    };
    
export default MarketResearchInDetailsScreen;