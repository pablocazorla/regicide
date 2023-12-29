import es_AR from "./languages/es_AR.json";

const languages = { es_AR };

// HARDCODED NOW:
const currentLanguage = "es_AR";

export const I18Ntext = (str, values = []) => {
  let text = languages[currentLanguage][str];
  if (typeof text === "undefined") {
    return str;
  }

  if (values.length) {
    const textArray = text.split("$$$");
    if (textArray.length === values.length + 1) {
      text = "";
      values.forEach((v, i) => {
        text += textArray[i] + v;
      });
      text += textArray[textArray.length - 1];
    }
  }
  return text;
};

export default I18Ntext;
