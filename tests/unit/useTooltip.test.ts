import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTooltip } from '../../app/hooks/useTooltip';

describe('useTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useTooltip());

    expect(result.current.isVisible).toBe(false);
    expect(typeof result.current.show).toBe('function');
    expect(typeof result.current.hide).toBe('function');
    expect(typeof result.current.toggle).toBe('function');
    expect(typeof result.current.triggerProps).toBe('object');
  });

  it('shows tooltip when show is called', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('hides tooltip when hide is called', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.hide();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('toggles tooltip visibility', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('respects delay option', () => {
    const { result } = renderHook(() => useTooltip({ delay: 200 }));

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(false);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('respects hideDelay option', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0, hideDelay: 200 }));

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.hide();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('does not show tooltip when disabled', () => {
    const { result } = renderHook(() => useTooltip({ disabled: true, delay: 0 }));

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('provides trigger props with event handlers', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    expect(result.current.triggerProps.onMouseEnter).toBeDefined();
    expect(result.current.triggerProps.onMouseLeave).toBeDefined();
    expect(result.current.triggerProps.onFocus).toBeDefined();
    expect(result.current.triggerProps.onBlur).toBeDefined();
  });

  it('shows tooltip on mouse enter trigger', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.triggerProps.onMouseEnter();
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('hides tooltip on mouse leave trigger', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.triggerProps.onMouseEnter();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.triggerProps.onMouseLeave();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('shows tooltip on focus trigger', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.triggerProps.onFocus();
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('hides tooltip on blur trigger', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    act(() => {
      result.current.triggerProps.onFocus();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.triggerProps.onBlur();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('clears timeouts on unmount', () => {
    const { result, unmount } = renderHook(() => useTooltip({ delay: 200 }));

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(false);

    unmount();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Should not crash or cause issues
  });

  it('includes aria-describedby when tooltip is visible', () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));

    expect(result.current.triggerProps['aria-describedby']).toBeUndefined();

    act(() => {
      result.current.show();
    });

    expect(result.current.triggerProps['aria-describedby']).toBe('tooltip');
  });

  it('cancels previous timeouts when called again', () => {
    const { result } = renderHook(() => useTooltip({ delay: 200 }));

    act(() => {
      result.current.show();
    });

    act(() => {
      result.current.hide();
    });

    act(() => {
      result.current.show();
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.isVisible).toBe(true);
  });
});