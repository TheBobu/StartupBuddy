import * as Yup from "yup";
import i18n from "i18next";

const RegisterValidationSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("Authentication.RequiredField")),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(i18n.t("Authentication.RequiredField")),
    email: Yup.string().email(i18n.t("Authentication.InvalidEmail")).required(i18n.t("Authentication.RequiredField")),
    password: Yup.string()
      .required(i18n.t("Authentication.RequiredField"))
      .min(8, i18n.t("Authentication.ShortPassword"))
      .matches(
        /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
        i18n.t("Authentication.PasswordRules")
      ),
  });
};

export default RegisterValidationSchema;
