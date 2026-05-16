import React, { useState, useEffect } from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 4000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const alertConfig = {
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      textColor: "text-green-900",
      icon: "✓",
      iconColor: "text-green-600",
    },
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      textColor: "text-red-900",
      icon: "✕",
      iconColor: "text-red-600",
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-900",
      icon: "⚠",
      iconColor: "text-yellow-600",
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      textColor: "text-blue-900",
      icon: "ℹ",
      iconColor: "text-blue-600",
    },
  };

  const config = alertConfig[type];

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 fade-in duration-300`}
    >
      <div
        className={`${config.bgColor} ${config.borderColor} border-2  shadow-lg p-4 flex items-start gap-3 max-w-md mx-auto`}
      >
        <span
          className={`${config.iconColor} font-bold text-xl mt-0.5 flex-shrink-0`}
        >
          {config.icon}
        </span>
        <p
          className={`${config.textColor} font-semibold text-sm md:text-base flex-1`}
        >
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className={`${config.textColor} hover:opacity-70 transition-opacity flex-shrink-0 font-bold text-lg ml-2`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
