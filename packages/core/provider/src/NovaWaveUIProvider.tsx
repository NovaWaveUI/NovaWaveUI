/* eslint-disable unicorn/filename-case */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { I18nProvider, I18nProviderProps } from 'react-aria';
import { TestButtonStyles, NonSlotVariantReturn } from '@novawaveui/theme';
import { ExtendedFromBase } from '@novawaveui/tailwind-composer';

export type ThemeMode = 'light' | 'dark';
export type ValidationBehavior = 'native' | 'aria';

export interface NovaWaveUIGlobalStylesConfig {
  /**
   * Any overriden global styles for the button component
   */
  button?: ExtendedFromBase<TestButtonStyles, NonSlotVariantReturn<any>>;
}

export interface NovaWaveUIContextProps {
  currentTheme: string;
  currentMode: string;
  setCurrentTheme: (theme: string) => void;
  setCurrentMode: (mode: ThemeMode) => void;
  disableAnimations: boolean;
  setDisableAnimations: (disableAnimations: boolean) => void;
  validationBehavior: ValidationBehavior;
  setValidationBehavior: (validationBehavior: ValidationBehavior) => void;
  globalStyles?: NovaWaveUIGlobalStylesConfig;
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

  /**
   * The global styles for the library
   */
  globalStyles?: NovaWaveUIGlobalStylesConfig;
}

export const NovaWaveUIProvider = ({
  children,
  theme = 'novawaveui',
  mode,
  validationBehavior: validationBehaviorProp = 'aria',
  disableAnimations: disableAnimationsProp = false,
  locale = 'en-us',
  globalStyles,
}: NovaWaveUIProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('novawaveui.theme');

    return storedTheme ?? theme;
  });

  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => {
    // Use the passed in mode if it exists
    if (mode) return mode;

    const storedMode = localStorage.getItem('novawaveui.mode') as ThemeMode;

    if (storedMode) return storedMode;

    // eslint-disable-next-line unicorn/prefer-global-this
    const prefersDarkMode = window.matchMedia(
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
    localStorage.setItem('novawaveui.theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.dataset.mode = `${currentMode}`;
    localStorage.setItem('novawaveui.mode', currentMode);
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
        globalStyles,
      }}
    >
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </NovaWaveUIContext.Provider>
  );
};
