import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonGroupProps } from '../src/components/buttonGroup';
import { ButtonGroup } from '../src/components/buttonGroup';
import { Button } from '../src/components/button/index';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'object',
      description: 'The buttons to be grouped.',
      defaultValue: [
        <Button key="1">Button 1</Button>,
        <Button key="2">Button 2</Button>,
        <Button key="3">Button 3</Button>,
      ],
    },
    color: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
      ],
      description: 'The color of the buttons in the group.',
      defaultValue: 'neutral',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the buttons in the group.',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'ghost', 'light'],
      description: 'The variant of the buttons in the group.',
      defaultValue: 'solid',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius of the buttons in the group.',
      defaultValue: 'md',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the buttons in the group are disabled.',
      defaultValue: false,
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the button group.',
      defaultValue: 'horizontal',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonGroupProps<any>>;

export const Default: Story = {
  args: {
    children: [
      <Button key="1">Button 1</Button>,
      <Button key="2">Button 2</Button>,
      <Button key="3">Button 3</Button>,
    ],
    size: 'md',
    variant: 'secondary',
    isDisabled: false,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    children: [
      <Button key="1">Button 1</Button>,
      <Button key="2">Button 2</Button>,
      <Button key="3">Button 3</Button>,
    ],
    size: 'md',
    variant: 'secondary',
    isDisabled: false,
    orientation: 'vertical',
  },
};

export const MixedVariants: Story = {
  args: {
    children: [
      <Button key="1">Button 1</Button>,
      <Button key="2">Button 2</Button>,
      <Button key="3" variant="tertiary">
        Button 3
      </Button>,
      <Button key="4">Button 4</Button>,
    ],
    size: 'md',
    variant: 'secondary',
    radius: 'md',
    isDisabled: false,
    orientation: 'horizontal',
  },
};
