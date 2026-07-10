"use client";
import React, { useEffect, useRef, useState } from "react";

interface BorderGradientButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  style?: React.CSSProperties;
  pressProgressDuration?: number;
}

const BorderGradientButton: React.FC<BorderGradientButtonProps> = ({
  className = "",
  style,
  children,
  pressProgressDuration = 650,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  ...props
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    const element = buttonRef.current;
    if (!element) return;

    let angle = 0;
    let animationFrameId: number;

    const rotateGradient = () => {
      angle = (angle + 1) % 360;
      element.style.setProperty("--gradient-angle", `${angle}deg`);
      animationFrameId = requestAnimationFrame(rotateGradient);
    };

    rotateGradient();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const startPressProgress = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") {
      setIsPressing(true);
    }
    onPointerDown?.(e);
  };

  const stopPressProgress = (
    e: React.PointerEvent<HTMLAnchorElement>,
    handler?: React.PointerEventHandler<HTMLAnchorElement>,
  ) => {
    if (e.pointerType !== "mouse") {
      setIsPressing(false);
    }
    handler?.(e);
  };

  return (
    <a
      ref={buttonRef}
      className={`border-gradient relative isolate overflow-hidden flex items-center justify-center ${className}`}
      style={style}
      onPointerDown={startPressProgress}
      onPointerUp={(e) => stopPressProgress(e, onPointerUp)}
      onPointerCancel={(e) => stopPressProgress(e, onPointerCancel)}
      onPointerLeave={(e) => stopPressProgress(e, onPointerLeave)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full origin-left rounded-[inherit] bg-white/20"
        style={{
          transform: isPressing ? "scaleX(1)" : "scaleX(0)",
          transitionDuration: isPressing
            ? `${pressProgressDuration}ms`
            : "180ms",
          transitionProperty: "transform",
          transitionTimingFunction: isPressing ? "linear" : "ease-out",
        }}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </a>
  );
};

export default BorderGradientButton;