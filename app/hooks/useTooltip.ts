import { useState, useRef, useEffect, useCallback } from "react";
import type { TooltipPosition } from "../components/Tooltip";

interface UseTooltipOptions {
  position?: TooltipPosition;
  disabled?: boolean;
  delay?: number;
  hideDelay?: number;
}

interface UseTooltipReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  triggerProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    "aria-describedby"?: string;
  };
}

export function useTooltip({
  position = "top",
  disabled = false,
  delay = 200,
  hideDelay = 0,
}: UseTooltipOptions = {}): UseTooltipReturn {
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    
    clearTimeouts();
    
    if (delay > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  }, [disabled, delay, clearTimeouts]);

  const hide = useCallback(() => {
    clearTimeouts();
    
    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    } else {
      setIsVisible(false);
    }
  }, [hideDelay, clearTimeouts]);

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  const handleMouseEnter = useCallback(() => {
    show();
  }, [show]);

  const handleMouseLeave = useCallback(() => {
    hide();
  }, [hide]);

  const handleFocus = useCallback(() => {
    show();
  }, [show]);

  const handleBlur = useCallback(() => {
    hide();
  }, [hide]);

  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  const triggerProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ...(isVisible && { "aria-describedby": "tooltip" }),
  };

  return {
    isVisible,
    show,
    hide,
    toggle,
    triggerProps,
  };
}