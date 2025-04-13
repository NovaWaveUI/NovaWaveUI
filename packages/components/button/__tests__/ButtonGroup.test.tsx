import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { NovaWaveUIProvider } from '@novawaveui/provider';
import { Button, ButtonGroup } from '../src';

const ProviderWrapper = ({ children }) => (
  <NovaWaveUIProvider>{children}</NovaWaveUIProvider>
);

describe('ButtonGroup', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders correctly', () => {
    const wrapper = render(<ButtonGroup>Click Me</ButtonGroup>, {
      wrapper: ProviderWrapper,
    });

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('forwards a ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = render(<ButtonGroup ref={ref}>Click Me</ButtonGroup>, {
      wrapper: ProviderWrapper,
    });

    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should ignore events when group is disabled', async () => {
    const onPress = jest.fn();
    const wrapper = render(
      <ButtonGroup isDisabled>
        <Button onPress={onPress} data-testid="button-test">
          Button 1
        </Button>
      </ButtonGroup>,
      {
        wrapper: ProviderWrapper,
      }
    );

    const button = wrapper.getByTestId('button-test');

    await user.click(button);

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should render with different variants and colors', () => {
    const wrapper = render(
      <ButtonGroup color="neutral" variant="ghost">
        <Button>Button 1</Button>
        <Button color="primary">Button 2</Button>
        <Button color="secondary">Button 3</Button>
        <Button variant="solid">Button 4</Button>
      </ButtonGroup>,
      {
        wrapper: ProviderWrapper,
      }
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
