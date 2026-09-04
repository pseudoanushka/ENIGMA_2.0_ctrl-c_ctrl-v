import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Dashboard": "Dashboard",
            "Overview": "Overview",
            "Patients": "Patients",
            "AI Analysis": "AI Analysis",
            "Consultations": "Consultations",
            "Critical Alerts": "Critical Alerts",
            "Symptom Logger": "Symptom Logger",
            "Test Reports": "Test Reports",
            "Medicine Tracker": "Medicine Tracker",
            "Find Doctors": "Find Doctors",
            "Health Insights": "Health Insights",
            "Education Hub": "Education Hub",
            "Patient Portal": "Patient Portal",
            "Doctor Portal": "Doctor Portal",
            "Language": "Language",
            "Logout": "Logout",
            "Settings": "Settings"
        }
    },
    hi: {
        translation: {
            "Dashboard": "डैशबोर्ड",
            "Overview": "अवलोकन",
            "Patients": "मरीज़",
            "AI Analysis": "एआई विश्लेषण",
            "Consultations": "परामर्श",
            "Critical Alerts": "महत्वपूर्ण अलर्ट",
            "Symptom Logger": "लक्षण लॉगर",
            "Test Reports": "टेस्ट रिपोर्ट",
            "Medicine Tracker": "दवा ट्रैकर",
            "Find Doctors": "डॉक्टर खोजें",
            "Health Insights": "स्वास्थ्य जानकारी",
            "Education Hub": "शिक्षा केंद्र",
            "Patient Portal": "मरीज़ पोर्टल",
            "Doctor Portal": "डॉक्टर पोर्टल",
            "Language": "भाषा",
            "Logout": "लॉग आउट",
            "Settings": "सेटिंग्स"
        }
    },
    mr: {
        translation: {
            "Dashboard": "डॅशबोर्ड",
            "Overview": "आढावा",
            "Patients": "रुग्ण",
            "AI Analysis": "एआय विश्लेषण",
            "Consultations": "सल्लामसलत",
            "Critical Alerts": "गंभीर सूचना",
            "Symptom Logger": "लक्षण लॉगर",
            "Test Reports": "चाचणी अहवाल",
            "Medicine Tracker": "औषध ट्रॅकर",
            "Find Doctors": "डॉक्टर शोधा",
            "Health Insights": "आरोग्याची माहिती",
            "Education Hub": "शिक्षण केंद्र",
            "Patient Portal": "रुग्ण पोर्टल",
            "Doctor Portal": "डॉक्टर पोर्टल",
            "Language": "भाषा",
            "Logout": "लॉगआउट",
            "Settings": "सेटिंग्ज"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
