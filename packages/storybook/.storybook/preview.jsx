import React, { useEffect } from 'react';
import './styles.css';
import { NovaWaveUIProvider, useNovaWaveUI } from '@novawaveui/provider';

const commonTheme = {
  brandTitle: 'NovaWaveUI',
  brandUrl: 'https://github.com/MotionWindUI/NovaWaveUI',
};

const locales = [
  'ar-AE',
  'bg-BG',
  'cs-CZ',
  'da-DK',
  'de-DE',
  'el-GR',
  'en-US',
  'es-ES',
  'et-EE',
  'fi-FI',
  'fr-FR',
  'he-IL',
  'hr-HR',
  'hu-HU',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'lt-LT',
  'lv-LV',
  'nb-NO',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'sl-SI',
  'sr-SP',
  'sv-SE',
  'tr-TR',
  'uk-UA',
  'zh-CN',
  'zh-TW',
];

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ['ref'],
    },
  },
  globalTypes: {
    disableAnimations: {
      description: 'Disables animations globally throughout the library',
      defaultValue: false,
      toolbar: {
        title: 'Disable Animations',
        icon: 'circlehollow',
        items: [
          { value: false, title: 'Enable' },
          { value: true, title: 'Disable' },
        ],
      },
    },
    mode: {
      description: 'The light or dark mode of NovaWaveUI',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    tempTheme: {
      description: 'The theme of NovaWaveUI',
      defaultValue: 'novawaveui',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [{ value: 'novawaveui', title: 'Default' }],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en-US',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: locales.map(locale => ({
          value: locale,
          title: new Intl.DisplayNames(undefined, { type: 'language' }).of(
            locale
          ),
          right:
            new Intl.Locale(locale)?.textInfo?.direction === 'rtl'
              ? 'Right To Left'
              : undefined,
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const StoryWithProvider = () => {
        const { setDisableAnimations, setCurrentMode, setCurrentTheme } =
          useNovaWaveUI();

        useEffect(() => {
          setCurrentTheme(context.globals.tempTheme);
        }, [context.globals.tempTheme]);

        useEffect(() => {
          setCurrentMode(context.globals.mode);
        }, [context.globals.mode]);

        useEffect(() => {
          setDisableAnimations(context.globals.disableAnimations);
        }, [context.globals.disableAnimations]);

        return <Story />;
      };

      const direction =
        context.globals.locale &&
        new Intl.Locale(context.globals.locale)?.textInfo?.direction === 'rtl'
          ? 'rtl'
          : undefined;

      return (
        <NovaWaveUIProvider locale={context.globals.locale}>
          <div dir={direction}>
            <StoryWithProvider />
          </div>
        </NovaWaveUIProvider>
      );
    },
  ],
};

export default preview;
