import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Tooltip } from '../../app/components/Tooltip';

// Mock createPortal to render in the current container
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: vi.fn((element: React.ReactNode) => element),
  };
});

describe('Tooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders children correctly', () => {
    render(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );

    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('wraps children in tooltip-trigger', () => {
    const { container } = render(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );

    expect(container.querySelector('.tooltip-trigger')).toBeInTheDocument();
  });

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content="Test tooltip" disabled>
        <button>Test Button</button>
      </Tooltip>
    );

    const button = screen.getByText('Test Button');
    fireEvent.mouseEnter(button);

    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
  });

  it('has proper trigger wrapper', () => {
    const { container } = render(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );

    const trigger = container.querySelector('.tooltip-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toContainElement(screen.getByText('Test Button'));
  });

  it('sets aria-describedby when tooltip should be visible', () => {
    const { container } = render(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );

    const button = screen.getByText('Test Button');
    const triggerElement = button.closest('.tooltip-trigger');
    
    // Initially no aria-describedby
    expect(triggerElement).not.toHaveAttribute('aria-describedby');

    fireEvent.mouseEnter(button);

    // After mouse enter, aria-describedby should be set
    expect(triggerElement).toHaveAttribute('aria-describedby', 'tooltip');
  });
});