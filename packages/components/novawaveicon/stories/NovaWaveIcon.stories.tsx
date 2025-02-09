import type { Meta } from '@storybook/react';
import { NovaWaveIcon } from '../src/index';
import { novaWaveIconStyles } from '@novawaveui/theme';
import { NovaWaveIconProps } from '../src/NovaWaveIcon';

const meta = {
  title: 'Components/NovaWaveIcon',
  component: NovaWaveIcon,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['auto', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
  },
  parameters: {
    controls: {
      exclude: /^(ref|children|className|as)$/,
    },
  },
} satisfies Meta<typeof NovaWaveIcon>;

export default meta;

const defaultProps = {
  ...novaWaveIconStyles.defaultVariants,
};

const Template = (args: NovaWaveIconProps) => <NovaWaveIcon {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    icon: 'AcademicCapIcon',
  },
};
