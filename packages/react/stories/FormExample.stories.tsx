import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../src/components/button';
import { TextField } from '../src/components/textfield';
import { Checkbox, CheckboxProps } from '../src/components/checkbox';
import { CheckboxGroup } from '../src/components/checkboxGroup';
import { Input } from '../src/components/primitives/input';
import { TextArea } from '../src/components/primitives/textarea';

const meta = {
  title: 'Examples/Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type CheckboxComponentProps = CheckboxProps & {
  children: React.ReactNode;
};
const CheckboxComponent = ({ children }: CheckboxComponentProps) => (
  <Checkbox>
    <Checkbox.Indicator>
      <Checkbox.Icon />
    </Checkbox.Indicator>
    <Checkbox.Label>{children}</Checkbox.Label>
  </Checkbox>
);

export const LoginForm: Story = {
  render: () => (
    <form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log('Form submitted:', Object.fromEntries(formData));
      }}
      style={{
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
        Sign In
      </h2>

      <TextField.Root name="email" type="email" isRequired>
        <TextField.Label>Email Address</TextField.Label>
        <TextField.Input>
          <Input placeholder="Enter your email" />
        </TextField.Input>
        <TextField.ErrorField />
        <TextField.Description>
          We'll never share your email.
        </TextField.Description>
      </TextField.Root>

      <TextField.Root name="password" isRequired>
        <TextField.Label>Password</TextField.Label>
        <TextField.Input>
          <Input placeholder="Enter your password" type="password" />
        </TextField.Input>
        <TextField.ErrorField />
      </TextField.Root>

      <Checkbox name="remember">
        <Checkbox.Indicator>
          <Checkbox.Icon />
        </Checkbox.Indicator>
        <Checkbox.Label>Remember me</Checkbox.Label>
      </Checkbox>

      <Button variant="primary" type="submit" className="my-2 w-full">
        Sign In
      </Button>

      <Button variant="tertiary" type="button">
        Forgot password?
      </Button>
    </form>
  ),
};

export const RegistrationForm: Story = {
  render: () => (
    <form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log('Form submitted:', Object.fromEntries(formData));
      }}
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
        Create Account
      </h2>

      <TextField.Root name="fullName" isRequired>
        <TextField.Label>Full Name</TextField.Label>
        <TextField.Input>
          <Input placeholder="John Doe" />
        </TextField.Input>
        <TextField.ErrorField />
      </TextField.Root>

      <TextField.Root name="email" isRequired>
        <TextField.Label>Email Address</TextField.Label>
        <TextField.Input>
          <Input placeholder="email@email.com" type="email" />
        </TextField.Input>
        <TextField.ErrorField />
      </TextField.Root>

      <TextField.Root name="password" isRequired>
        <TextField.Label>Password</TextField.Label>
        <TextField.Input>
          <Input type="password" placeholder="Create a password" />
        </TextField.Input>
        <TextField.Description>
          Must include letters and numbers
        </TextField.Description>
        <TextField.ErrorField />
      </TextField.Root>

      <CheckboxGroup.Root
        name="preferences"
        className="flex flex-col items-start"
      >
        <CheckboxGroup.Label>Preferences</CheckboxGroup.Label>
        <Checkbox value="newsletter">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Subscribe to newsletter</Checkbox.Label>
        </Checkbox>
        <Checkbox value="updates">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Receive product updates</Checkbox.Label>
        </Checkbox>
        <Checkbox value="usageData">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Share usage data anonymously</Checkbox.Label>
        </Checkbox>
      </CheckboxGroup.Root>

      <div className="flex flex-col items-start">
        <Checkbox name="terms" isRequired className="mt-2">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>I agree to the Terms and Conditions</Checkbox.Label>
        </Checkbox>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Button variant="primary" type="submit" style={{ flex: 1 }}>
          Create Account
        </Button>
        <Button variant="tertiary" type="button" style={{ flex: 1 }}>
          Cancel
        </Button>
      </div>
    </form>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log('Form submitted:', Object.fromEntries(formData));
      }}
      style={{
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
        Contact Us
      </h2>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
      >
        <TextField.Root name="firstName" isRequired>
          <TextField.Label>First Name</TextField.Label>
          <TextField.Input>
            <Input placeholder="John" />
          </TextField.Input>
          <TextField.ErrorField />
        </TextField.Root>

        <TextField.Root name="lastName" isRequired>
          <TextField.Label>Last Name</TextField.Label>
          <TextField.Input>
            <Input placeholder="Doe" />
          </TextField.Input>
          <TextField.ErrorField />
        </TextField.Root>
      </div>

      <TextField.Root name="email" type="email" isRequired>
        <TextField.Label>Email Address</TextField.Label>
        <TextField.Input>
          <Input placeholder="john@example.com" />
        </TextField.Input>
        <TextField.ErrorField />
      </TextField.Root>

      <TextField.Root name="subject" isRequired>
        <TextField.Label>Subject</TextField.Label>
        <TextField.Input>
          <Input placeholder="Subject of your message" />
        </TextField.Input>
        <TextField.ErrorField />
      </TextField.Root>

      <TextField.Root name="message" isRequired>
        <TextField.Label>Message</TextField.Label>
        <TextField.Input>
          <TextArea placeholder="Write your message here..." rows={5} />
        </TextField.Input>
        <TextField.ErrorField />
      </TextField.Root>

      <CheckboxGroup.Root
        name="topic"
        isRequired
        className="items-start"
        validationBehavior="native"
        defaultValue={[]}
      >
        <CheckboxGroup.Label>Topic</CheckboxGroup.Label>
        <Checkbox value="sales">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Sales Inquiry</Checkbox.Label>
        </Checkbox>
        <Checkbox value="support">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Technical Support</Checkbox.Label>
        </Checkbox>
        <Checkbox value="feedback">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Feedback</Checkbox.Label>
        </Checkbox>
        <Checkbox value="other">
          <Checkbox.Indicator>
            <Checkbox.Icon />
          </Checkbox.Indicator>
          <Checkbox.Label>Other</Checkbox.Label>
        </Checkbox>
      </CheckboxGroup.Root>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Button variant="primary" type="submit">
          Send Message
        </Button>
        <Button variant="secondary" type="reset">
          Reset
        </Button>
      </div>
    </form>
  ),
};
