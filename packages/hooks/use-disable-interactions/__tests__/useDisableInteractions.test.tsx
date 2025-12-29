import { describe, it, expect, vi } from 'vitest';
import { useDisableInteractions } from '../src/useDisableInteractions';

describe('useDisableInteractions', () => {
  it('returns original props when interactive', () => {
    const props = {
      onClick: vi.fn(),
      onFocus: vi.fn(),
      onBlur: vi.fn(),
      id: 'btn-1',
    };

    const result = useDisableInteractions(props as any, true);

    expect(result).toBe(props);
    expect(result.onClick).toBe(props.onClick);
    expect(result.onFocus).toBe(props.onFocus);
    expect(result.onBlur).toBe(props.onBlur);
    expect(result.id).toBe('btn-1');
  });

  it('removes non-focus/blur handlers when not interactive', () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const props = {
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      'data-test': 'keep-me',
    };

    const result = useDisableInteractions(props as any, false);

    expect(result).not.toBe(props);
    expect(result.onFocus).toBe(onFocus);
    expect(result.onBlur).toBe(onBlur);
    expect((result as any)['data-test']).toBe('keep-me');
    expect(result.onClick).toBeUndefined();
    expect(result.onKeyDown).toBeUndefined();

    // Ensure original props are not mutated
    expect(props.onClick).toBe(onClick);
    expect(props.onKeyDown).toBe(onKeyDown);
  });

  it('handles empty props object', () => {
    const result = useDisableInteractions({} as any, false);
    expect(result).toEqual({});
  });
});
