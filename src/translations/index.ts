import i18n from "i18n-js";
import RNLocalize from "react-native-localize";
import { I18nManager } from "react-native";
import memoize from "lodash.memoize";

const translationGetters = {
  pt: () => require("./languages/pt.json"),
  en: () => require("./languages/en.json"),
  es: () => require("./languages/es.json"),
};

const translate = memoize(
  (key: string, config?: object) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  const fallback = { languageTag: "pt", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  translate.cache.clear();
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export { setI18nConfig, translate };
