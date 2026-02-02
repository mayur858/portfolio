"use client";
import React, { useEffect, useRef } from "react";

interface BorderGradientButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  style?: React.CSSProperties;
}

const BorderGradientButton: React.FC<BorderGradientButtonProps> = ({
  className = "",
  style,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

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

  return (
    <a
      ref={buttonRef}
      className={`border-gradient flex items-center justify-center ${className}`}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
};

export default BorderGradientButton;
