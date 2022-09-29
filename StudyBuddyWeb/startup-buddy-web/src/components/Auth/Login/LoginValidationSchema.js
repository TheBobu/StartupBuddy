import * as Yup from "yup";
import i18n from "i18next";

const LoginValidationSchema = () => {
  return Yup.object().shape({
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

export default LoginValidationSchema;
