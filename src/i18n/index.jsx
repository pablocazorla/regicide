"use client";

import AppOptionContext from "@/contexts/appOptions/context";
import ES from "./languages/es.json";
import EN from "./languages/en.json";
import { useMemo, useContext } from "react";

const languages = { ES, EN };

// HARDCODED NOW:
const currentLanguage = "ES";
/*
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
*/

const I18Ntext = ({ str = "", values = [], isForHTML }) => {
  const { lang } = useContext(AppOptionContext);

  const textComplete = useMemo(() => {
    let text = languages[lang || "EN"][str];
    if (typeof text === "undefined") {
      return "%%%"; //str;
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
  }, [str, values, lang]);

  return isForHTML ? (
    <div
      dangerouslySetInnerHTML={{
        __html: textComplete,
      }}
    />
  ) : (
    textComplete
  );
};

export default I18Ntext;
