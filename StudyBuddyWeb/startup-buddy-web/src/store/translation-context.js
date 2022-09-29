import React from "react";
import { useTranslation } from "react-i18next";

export const TranslationContext = React.createContext({
  t: null,
});

export const TranslationProvider = (props) => {
  const { t } = useTranslation();

  const trans = { t };

  return <TranslationContext.Provider value={trans}> {props.children}</TranslationContext.Provider>;
};
