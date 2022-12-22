import en_t from "./en/_lang.js";
import de_t from "./de/_lang.js";
import _ from "lodash";

type FullTranslation = typeof import("i18n/en/_lang.js").default;

const progressiveMerge = (lang: any): FullTranslation => {
  const newTranslation: FullTranslation = _.cloneDeep(en_t);

  const partialTranslation = _.merge(newTranslation, lang);

  return partialTranslation;
};

export interface SiteTranslation {
  en: FullTranslation;
  de: FullTranslation;
}

const translations: SiteTranslation = {
  en: en_t,
  de: progressiveMerge(de_t),
};

export { translations };
