/* eslint-disable unicorn/filename-case */
/* eslint-disable no-unused-vars */
import { useLocalStorage } from '@novawaveui/use-localstorage';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { I18nProvider, I18nProviderProps } from 'react-aria';

export type ThemeMode = 'light' | 'dark';
export type ValidationBehavior = 'native' | 'aria';

export interface NovaWaveUIContextProps {
  currentTheme: string;
  currentMode: string;
  setCurrentTheme: (theme: string) => void;
  setCurrentMode: (mode: ThemeMode) => void;
  disableAnimations: boolean;
  setDisableAnimations: (disableAnimations: boolean) => void;
  validationBehavior: ValidationBehavior;
  setValidationBehavior: (validationBehavior: ValidationBehavior) => void;
}

export const NovaWaveUIContext = createContext<
  NovaWaveUIContextProps | undefined
>(undefined);

export const useNovaWaveUI = () => {
  const context = React.useContext(NovaWaveUIContext);

  if (!context) {
    throw new Error('useNovaWaveUI must be used within a NovaWaveUIProvider');
  }

  return context;
};

interface NovaWaveUIProviderProps {
  children: React.ReactNode;

  /**
   * The theme to set the UI to
   */
  theme?: string;

  /**
   * The light or dark mode to set the UI to
   */
  mode?: ThemeMode;

  /**
   * Disables animations globally in the library
   */
  disableAnimations?: boolean;

  /**
   * The validation behavior to use. Defaults to "aria"
   */
  validationBehavior?: ValidationBehavior;

  /**
   * The locale to use for i18n
   */
  locale?: I18nProviderProps['locale'];
}

export const NovaWaveUIProvider = ({
  children,
  theme = 'novawaveui',
  mode,
  validationBehavior: validationBehaviorProp = 'aria',
  disableAnimations: disableAnimationsProp = false,
  locale = 'en-us',
}: NovaWaveUIProviderProps) => {
  const isLocalStorageAvailable = useMemo(() => useLocalStorage(), []);

  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    const storedTheme = isLocalStorageAvailable
      ? localStorage.getItem('novawaveui.theme')
      : undefined;

    return storedTheme ?? theme;
  });

  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => {
    // Use the passed in mode if it exists
    if (mode) return mode;

    const storedMode = isLocalStorageAvailable
      ? (localStorage.getItem('novawaveui.mode') as ThemeMode)
      : undefined;

    if (storedMode) return storedMode;

    const prefersDarkMode = globalThis.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    return prefersDarkMode ? 'dark' : 'light';
  });

  const [disableAnimations, setDisableAnimations] = useState(
    disableAnimationsProp
  );

  const [validationBehavior, setValidationBehavior] =
    useState<ValidationBehavior>(validationBehaviorProp);

  useEffect(() => {
    document.documentElement.dataset.theme = `${currentTheme}`;
    if (isLocalStorageAvailable) {
      localStorage.setItem('novawaveui.theme', currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.dataset.mode = `${currentMode}`;
    if (isLocalStorageAvailable) {
      localStorage.setItem('novawaveui.mode', currentMode);
    }
  }, [currentMode]);

  return (
    <NovaWaveUIContext.Provider
      value={{
        currentTheme,
        currentMode,
        setCurrentTheme,
        setCurrentMode,
        disableAnimations,
        setDisableAnimations,
        validationBehavior,
        setValidationBehavior,
      }}
    >
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </NovaWaveUIContext.Provider>
  );
};
