import { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import { NovaWaveUIProvider, useNovaWaveUI } from '@novawaveui/provider';
import './styles.css';

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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: /^(ref|as)$/,
    },
    backgrounds: {
      dark: { name: 'Dark', value: '#333' },
      light: { name: 'Light', value: '#F7F9F2' },
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
        items: [
          { value: 'novawaveui', title: 'Default' },
          { value: 'example', title: 'Example' },
        ],
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
          right: ['ar-AE', 'he-IL', 'fa-IR', 'ur-PK'].includes(locale)
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

          const body = window.document.body;
          if (context.globals.mode === 'dark') {
            body.style.backgroundColor = 'var(--neutral-900)';
            body.style.color = '#fff';
          } else {
            body.style.backgroundColor = 'var(--neutral-50)';
            body.style.color = '#000';
          }
        }, [context.globals.mode]);

        useEffect(() => {
          setDisableAnimations(context.globals.disableAnimations);
        }, [context.globals.disableAnimations]);

        return <Story />;
      };

      const rtlLocales = ['ar-AE', 'he-IL', 'fa-IR', 'ur-PK'];
      const direction =
        context.globals.locale && rtlLocales.includes(context.globals.locale)
          ? 'rtl'
          : undefined;

      context.parameters.backgrounds = {
        ...context.parameters.backgrounds,
        default: context.globals.mode === 'dark' ? 'dark' : 'light',
      };

      return (
        <NovaWaveUIProvider
          locale={context.globals.locale}
          mode={context.globals.mode}
        >
          <div dir={direction}>
            <StoryWithProvider />
          </div>
        </NovaWaveUIProvider>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
