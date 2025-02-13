import React from "react";

const Button = ({
  variant,
  buttonText,
  classes,
  ...props
}: {
  variant?: string;
  buttonText: string;
  classes?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantColor =
    variant === "error"
      ? "bg-red-600 text-white"
      : variant === "outline"
        ? "bg-white border-2 border-blue-700 text-blue-700"
        : "bg-blue-600 text-white";
  return (
    <button
      {...props}
      className={`${variantColor} ${classes} p-3 rounded-md min-w-32`}
    >
      {buttonText}
    </button>
  );
};

const Input = ({
  label,
  error,
  ...props
}: {
  label: string;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const errorClass: string = error
    ? "ring-1 ring-red-600 border  focus:outline-none focus:border-red-600 active:border-red-600 focus-visible:border-red-600"
    : "focus:outline-none focus:ring-1 focus:ring-blue-400";
  return (
    <div className="relative">
      <input
        {...props}
        id={props.id || label}
        className={`border rounded-md px-3 py-2 w-full peer h-[60px] ${errorClass}`}
        placeholder=" "
      />
      <label
        htmlFor={props.id || label}
        className="absolute text-md text-gray-700 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 cursor-text"
      >
        {label}
      </label>
    </div>
  );
};

const TextArea = ({
  label,
  error,
  ...props
}: {
  label: string;
  error?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const errorClass: string = error
    ? "ring-1 ring-red-600 border  focus:outline-none focus:border-red-600 active:border-red-600 focus-visible:border-red-600"
    : "focus:outline-none focus:ring-1 focus:ring-blue-400";
  return (
    <div className="relative">
      <textarea
        {...props}
        id={props.id || label}
        className={`border rounded-md px-3 py-2 w-full peer h-auto ${errorClass}`}
        placeholder=" "
      />
      <label
        htmlFor={props.id || label}
        className="absolute text-md text-gray-700 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-10 peer-placeholder-shown:-translate-y-full peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 cursor-text"
      >
        {label}
      </label>
    </div>
  );
};

const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!mounted) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 flex justify-center items-center z-50 transition-all duration-300 ease-in-out
        ${open ? "opacity-100 bg-opacity-75" : "opacity-0 bg-opacity-0 pointer-events-none"}`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white rounded-lg shadow-md relative w-4/5 md:w-[50%] transition-all duration-300 ease-in-out
          ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-4"}`}
      >
        {children}
      </div>
    </div>
  );
};

const Drawer = ({
  open,
  onClose,
  children,
  width = "300px",
  position = "left",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  position?: "left" | "right";
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!mounted) return null;

  const drawerStyle: React.CSSProperties = {
    width: width,
    top: 0,
    bottom: 0,
    position: "fixed",
    backgroundColor: "white",
    zIndex: 1000,
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    ...(position === "left"
      ? {
          left: 0,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          opacity: open ? 1 : 0,
          willChange: "transform, opacity",
        }
      : {
          right: 0,
          transform: open ? "translateX(0)" : "translateX(100%)",
          opacity: open ? 1 : 0,
          willChange: "transform, opacity",
        }),
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    opacity: open ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    willChange: "opacity",
  };

  return (
    <div>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={drawerStyle}>{children}</div>
    </div>
  );
};

export { Button, Input, Modal, TextArea, Drawer };
