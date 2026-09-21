import { useEffect } from "react";

type ToastProps = {
  type: "SUCCESS" | "ERROR";
  message: string;
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "bg-green-600"
      : "bg-red-600";

  return (
    <div
      role="alert"
      className={`fixed top-4 right-4 left-4 sm:left-auto sm:right-5 z-[9999] w-auto sm:w-fit max-w-md ${styles} text-white p-3 sm:p-4 rounded-lg shadow-xl`}
    >
      <div className="flex items-center justify-center sm:justify-start min-w-0">
        <span className="text-sm sm:text-base md:text-lg font-semibold text-center sm:text-left break-words">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;