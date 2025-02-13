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
  const errorClass = error
    ? "ring-1 ring-red-600 border  focus:outline-none focus:border-red-600 active:border-red-600 focus-visible:border-red-600"
    : "focus:outline-none focus:ring-1 focus:ring-blue-400";
  return (
    <div className="relative">
      <input
        {...props}
        className={`border rounded-md px-3 py-2 w-full peer h-[60px] ${errorClass}`}
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className="absolute text-md text-gray-700 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
};

export { Button, Input };
