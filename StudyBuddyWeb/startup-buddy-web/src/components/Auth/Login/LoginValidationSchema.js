import * as Yup from "yup";
import i18n from "i18next";

const LoginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email(i18n.t("Authentication.InvalidEmail")).required(i18n.t("Authentication.RequiredField"))
  });
};

export default LoginValidationSchema;
