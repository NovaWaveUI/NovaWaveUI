import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text, TextProps } from '../src/text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render the text as.',
      defaultValue: 'span',
    },
    children: {
      control: 'text',
      description: 'The content of the text component.',
      defaultValue: 'This is a text component',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'This is a text component',
    as: 'span',
  },
};

export const Polymorphic: Story = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text
        as="h1"
        style={{ fontSize: '32px', fontWeight: 'bold' }}
        {...(args as TextProps<'h1'>)}
      >
        This is an h1 text
      </Text>
      <Text
        as="h2"
        style={{ fontSize: '28px', fontWeight: 'bold' }}
        {...(args as TextProps<'h2'>)}
      >
        This is an h2 text
      </Text>
      <Text
        as="h3"
        style={{ fontSize: '24px', fontWeight: 'bold' }}
        {...(args as TextProps<'h3'>)}
      >
        This is an h3 text
      </Text>
      <Text as="p" style={{ fontSize: '16px' }} {...(args as TextProps<'p'>)}>
        This is a paragraph text
      </Text>
      <Text
        as="span"
        style={{ fontSize: '14px' }}
        {...(args as TextProps<'span'>)}
      >
        This is a span text
      </Text>
    </div>
  ),
  args: {},
};
