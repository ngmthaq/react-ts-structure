export interface LangConst {
  AVAILABLE_LANGUAGES: AvailableLanguages;
  AVAILABLE_NS: AvailableNS;
}

export interface AvailableLanguages {
  vi: Language;
  en: Language;
}

export interface AvailableNS {
  common: string;
}

export interface Language {
  name: string;
  alias: string;
}
