import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: TooltipPosition;
  disabled?: boolean;
  className?: string;
}

export function Tooltip({ 
  children, 
  content, 
  position = "top", 
  disabled = false,
  className = ""
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [actualPosition, setActualPosition] = useState<TooltipPosition>(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current || disabled) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipElement = tooltipRef.current;
    
    if (!tooltipElement) return;

    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let x = 0;
    let y = 0;
    let finalPosition = position;

    // Calculate initial position
    switch (position) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + 8;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right":
        x = triggerRect.right + 8;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Check if tooltip goes outside viewport and adjust
    if (x < 8) {
      x = 8;
    } else if (x + tooltipRect.width > viewport.width - 8) {
      x = viewport.width - tooltipRect.width - 8;
    }

    if (y < 8) {
      if (position === "top") {
        // Flip to bottom
        y = triggerRect.bottom + 8;
        finalPosition = "bottom";
      } else {
        y = 8;
      }
    } else if (y + tooltipRect.height > viewport.height - 8) {
      if (position === "bottom") {
        // Flip to top
        y = triggerRect.top - tooltipRect.height - 8;
        finalPosition = "top";
      } else {
        y = viewport.height - tooltipRect.height - 8;
      }
    }

    setTooltipPosition({ x, y });
    setActualPosition(finalPosition);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        calculatePosition();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isVisible, position]);

  useEffect(() => {
    if (isVisible) {
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [isVisible]);

  const tooltipElement = isVisible && tooltipPosition && (
    <div
      ref={tooltipRef}
      className={`tooltip tooltip-${actualPosition} ${className}`}
      style={{
        position: "fixed",
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        zIndex: 9999,
      }}
      role="tooltip"
      aria-hidden={!isVisible}
    >
      {content}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="tooltip-trigger"
        aria-describedby={isVisible ? "tooltip" : undefined}
      >
        {children}
      </div>
      {typeof document !== "undefined" && tooltipElement && 
        createPortal(tooltipElement, document.body)
      }
    </>
  );
}