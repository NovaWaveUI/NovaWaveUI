import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGroup } from '../../src/components/buttonGroup';
import { Button } from '../../src/components/button';

describe('ButtonGroup', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { getByRole } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toBeInTheDocument();
      expect(group).toHaveAttribute('data-component', 'button-group');
      expect(group).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders multiple buttons in the group', () => {
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      expect(buttons).toHaveLength(3);
      expect(buttons[0]).toHaveTextContent('Button 1');
      expect(buttons[1]).toHaveTextContent('Button 2');
      expect(buttons[2]).toHaveTextContent('Button 3');
    });

    it('renders as a different element with as prop', () => {
      const { container } = render(
        <ButtonGroup as="nav">
          <Button>Home</Button>
          <Button>About</Button>
        </ButtonGroup>
      );
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('role', 'group');
    });

    it('renders with className', () => {
      const { getByRole } = render(
        <ButtonGroup className="custom-class">
          <Button>Button</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toHaveClass('custom-class');
    });

    it('renders with custom data attributes', () => {
      const { getByRole } = render(
        <ButtonGroup data-testid="custom-group" data-track="button-group">
          <Button>Button</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('data-testid', 'custom-group');
      expect(group).toHaveAttribute('data-track', 'button-group');
    });
  });

  describe('Orientation', () => {
    it('sets horizontal orientation by default', () => {
      const { getByRole } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('sets vertical orientation when specified', () => {
      const { getByRole } = render(
        <ButtonGroup orientation="vertical">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('data-orientation', 'vertical');
    });

    it('sets horizontal orientation when explicitly specified', () => {
      const { getByRole } = render(
        <ButtonGroup orientation="horizontal">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('data-orientation', 'horizontal');
    });
  });

  describe('State', () => {
    it('sets disabled state on all buttons in group', () => {
      const { getAllByRole } = render(
        <ButtonGroup isDisabled>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-disabled', 'true');
      }
    });

    it('prevents click events when group is disabled', () => {
      const onClick = vi.fn();
      const { getAllByRole } = render(
        <ButtonGroup isDisabled>
          <Button onClick={onClick}>Button 1</Button>
          <Button onClick={onClick}>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('allows individual buttons to override disabled state', () => {
      const onClick = vi.fn();
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button onClick={onClick} isDisabled={false}>
            Enabled
          </Button>
          <Button onClick={onClick} isDisabled={true}>
            Disabled
          </Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      fireEvent.click(buttons[0]);
      expect(onClick).toHaveBeenCalled();
      const callCount = onClick.mock.calls.length;
      fireEvent.click(buttons[1]);
      expect(onClick.mock.calls.length).toBe(callCount);
    });
  });

  describe('Variant Propagation', () => {
    it('propagates primary variant to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup variant="primary">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-variant', 'primary');
      }
    });

    it('propagates secondary variant to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup variant="secondary">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-variant', 'secondary');
      }
    });

    it('propagates tertiary variant to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup variant="tertiary">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-variant', 'tertiary');
      }
    });

    it('propagates link variant to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup variant="link">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-variant', 'link');
      }
    });

    it('allows child button to override group variant', () => {
      const { getAllByRole } = render(
        <ButtonGroup variant="secondary">
          <Button variant="primary">Override</Button>
          <Button>Inherit</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('data-variant', 'primary');
      expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');
    });
  });

  describe('Size Propagation', () => {
    it('propagates sm size to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup size="sm">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-size', 'sm');
      }
    });

    it('propagates md size to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup size="md">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-size', 'md');
      }
    });

    it('propagates lg size to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup size="lg">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-size', 'lg');
      }
    });

    it('allows child button to override group size', () => {
      const { getAllByRole } = render(
        <ButtonGroup size="lg">
          <Button size="sm">Small Override</Button>
          <Button>Large (Inherit)</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('data-size', 'sm');
      expect(buttons[1]).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Interaction', () => {
    it('calls onClick on individual buttons when clicked', () => {
      const onClick1 = vi.fn();
      const onClick2 = vi.fn();
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button onClick={onClick1}>Button 1</Button>
          <Button onClick={onClick2}>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      fireEvent.click(buttons[0]);
      expect(onClick1).toHaveBeenCalled();
      expect(onClick2).not.toHaveBeenCalled();

      onClick1.mockClear();
      onClick2.mockClear();
      fireEvent.click(buttons[1]);
      expect(onClick1).not.toHaveBeenCalled();
      expect(onClick2).toHaveBeenCalled();
    });

    it('buttons are keyboard focusable when in group', async () => {
      const user = userEvent.setup();
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      // Focus first button
      await user.tab();
      expect(buttons[0]).toHaveFocus();
      // Focus second button
      await user.tab();
      expect(buttons[1]).toHaveFocus();
    });

    it('buttons respond to click events when in group', () => {
      const onClick = vi.fn();
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button onClick={onClick}>Button</Button>
        </ButtonGroup>
      );
      const btn = getAllByRole('button')[0];
      fireEvent.click(btn);
      expect(onClick).toHaveBeenCalled();
    });

    it('disabled buttons do not fire click events', () => {
      const onClick = vi.fn();
      const { getAllByRole } = render(
        <ButtonGroup isDisabled>
          <Button onClick={onClick}>Button</Button>
        </ButtonGroup>
      );
      const btn = getAllByRole('button')[0];
      fireEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct group role', () => {
      const { getByRole } = render(
        <ButtonGroup>
          <Button>Button</Button>
        </ButtonGroup>
      );
      expect(getByRole('group')).toBeInTheDocument();
    });

    it('supports aria-label prop on group', () => {
      const { getByRole } = render(
        <ButtonGroup aria-label="Navigation buttons">
          <Button>Button</Button>
        </ButtonGroup>
      );
      const group = getByRole('group', { name: 'Navigation buttons' });
      expect(group).toBeInTheDocument();
    });

    it('supports aria-labelledby prop on group', () => {
      const { getByRole } = render(
        <>
          <h2 id="group-title">Actions</h2>
          <ButtonGroup aria-labelledby="group-title">
            <Button>Button</Button>
          </ButtonGroup>
        </>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('aria-labelledby', 'group-title');
    });

    it('supports aria-describedby prop on group', () => {
      const { getByRole } = render(
        <>
          <ButtonGroup aria-describedby="group-desc">
            <Button>Button</Button>
          </ButtonGroup>
          <p id="group-desc">Choose an action to proceed</p>
        </>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('aria-describedby', 'group-desc');
    });

    it('maintains semantic button roles in child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('child buttons remain keyboard accessible when in group', () => {
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toBeVisible();
      }
    });
  });

  describe('Mixed Content', () => {
    it('renders buttons with different variants in same group', () => {
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('data-variant', 'primary');
      expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');
      expect(buttons[2]).toHaveAttribute('data-variant', 'tertiary');
    });

    it('renders buttons with different sizes in same group', () => {
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('data-size', 'sm');
      expect(buttons[1]).toHaveAttribute('data-size', 'md');
      expect(buttons[2]).toHaveAttribute('data-size', 'lg');
    });

    it('renders buttons with mixed states', () => {
      const onClick = vi.fn();
      const { getAllByRole } = render(
        <ButtonGroup>
          <Button onClick={onClick}>Active</Button>
          <Button isDisabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      fireEvent.click(buttons[0]);
      expect(onClick).toHaveBeenCalled();
      const callCountAfterFirst = onClick.mock.calls.length;

      fireEvent.click(buttons[1]);
      fireEvent.click(buttons[2]);

      expect(onClick.mock.calls.length).toBe(callCountAfterFirst);
      expect(buttons[1]).toHaveAttribute('data-disabled', 'true');
      expect(buttons[2]).toHaveAttribute('data-loading', 'true');
    });
  });

  describe('Context Propagation', () => {
    it('provides size and variant through context to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup size="lg" variant="tertiary">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-size', 'lg');
        expect(btn).toHaveAttribute('data-variant', 'tertiary');
      }
    });

    it('provides disabled state through context to child buttons', () => {
      const { getAllByRole } = render(
        <ButtonGroup isDisabled>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const buttons = getAllByRole('button');
      for (const btn of buttons) {
        expect(btn).toHaveAttribute('data-disabled', 'true');
      }
    });

    it('provides orientation through context', () => {
      const { getByRole } = render(
        <ButtonGroup orientation="vertical">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );
      const group = getByRole('group');
      expect(group).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('Polymorphism', () => {
    it('renders as nav element when specified', () => {
      const { container } = render(
        <ButtonGroup as="nav">
          <Button>Home</Button>
          <Button>About</Button>
        </ButtonGroup>
      );
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('role', 'group');
    });

    it('renders as section element when specified', () => {
      const { container } = render(
        <ButtonGroup as="section">
          <Button>Button 1</Button>
        </ButtonGroup>
      );
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('role', 'group');
    });

    it('preserves element-specific attributes when polymorphic', () => {
      const { container } = render(
        <ButtonGroup as="nav" aria-label="Navigation">
          <Button>Home</Button>
        </ButtonGroup>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Navigation');
    });
  });
});
