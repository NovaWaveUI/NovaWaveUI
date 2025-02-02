import type { Meta } from '@storybook/react';
import { Icon } from '../src/index';
import { iconStyles } from '../src/styles/icon';
import { IconProps } from '../src/Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  parameters: {
    controls: {
      exclude: /^(ref|children|className|as)$/,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

const defaultProps = {
  ...iconStyles.defaultVariants,
};

const Template = (args: IconProps) => (
  <Icon {...args}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
      />
    </svg>
  </Icon>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
