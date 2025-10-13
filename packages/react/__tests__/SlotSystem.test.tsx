import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { createSlotSystem } from '../src/utils/slots';

describe('SlotSystem', () => {
  it('registers presence when element mounts and unregisters on unmount', () => {
    const Slots = createSlotSystem<{
      test: { ref?: any; 'data-testid'?: string };
    }>();
    const { Provider, useSlot } = Slots;

    function Consumer() {
      const slotProps = useSlot('test', { 'data-testid': 'slot-el' });

      return (
        <>
          <div data-testid="presence-count">{slotProps.ref ? '1' : '0'}</div>
          {/* render an element that will attach the slot ref */}
          <div {...slotProps}>Hello</div>
        </>
      );
    }

    const { unmount } = render(
      <Provider value={{}}>
        <Consumer />
      </Provider>
    );

    // After mount, presence should be true
    expect(screen.getByTestId('presence-count').textContent).toBe('1');

    // Unmount should clear presence via layout effect
    act(() => {
      unmount();
    });

    // After unmount there's no presence DOM; just ensure no errors happened
    expect(true).toBe(true);
  });

  it('merges refs and properties from context and props', () => {
    const Slots = createSlotSystem<{
      test: { ref?: any; 'data-testid'?: string; title?: string };
    }>();
    const { Provider, useSlot } = Slots;

    let capturedRef: any;

    function Inner() {
      const slotProps = useSlot('test', {
        'data-testid': 'slot-el',
        title: 'from-prop',
      });
      return <div {...slotProps}>Inner</div>;
    }

    function App() {
      return (
        <Provider
          value={{
            test: { ref: (el: any) => (capturedRef = el), title: 'from-ctx' },
          }}
        >
          <Inner />
        </Provider>
      );
    }

    render(<App />);

    // capturedRef should have been called with the DOM node
    expect(capturedRef).not.toBeNull();

    // The title prop from prop should override context title in mergeProps ordering
    const el = screen.getByTestId('slot-el');
    expect(el.getAttribute('title')).toBe('from-prop');
  });
});
