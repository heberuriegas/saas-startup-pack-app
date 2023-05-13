import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import en from '../../../translations/en.json';
import es from '../../../translations/es.json';

interface I18nContextProps {
  i18n: I18n;
  setLocale: (locale: string) => void;
}

export const I18nContext = createContext<I18nContextProps>({
  i18n: new I18n(),
  setLocale: (locale: string) => {},
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [i18n, setI18n] = useState<I18n>(
    new I18n({
      ...en,
      ...es,
    })
  );

  const setLocale = (locale: string) => {
    i18n.locale = locale;
  };

  useEffect(() => {
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;

    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.enableFallback = true;

    // To see the fallback mechanism uncomment line below to force app to use Japanese language.
    i18n.locale = 'en';

    setI18n(i18n);
  }, []);

  return <I18nContext.Provider value={{ i18n, setLocale }}>{children}</I18nContext.Provider>;
};
