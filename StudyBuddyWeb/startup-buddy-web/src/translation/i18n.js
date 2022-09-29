import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './translationEN.json'
import translationRO from './translationRO.json'
import LanguageDetector from "i18next-browser-languagedetector";

const languages = ["ro", "en"];

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources: {
        en: {
            translation: translationEN,
        },
        ro: {
            translation: translationRO,
        },
    },
    detection: { order: ["path", "navigator"] },
    debug: false, 
    returnObjects: true,
    whitelist: languages,
    joinArrays: false,
    fallbackLng: 'ro',
    interpolation: {
        escapeValue: true, //Cross Site Scripting
    },
})
export default i18n

