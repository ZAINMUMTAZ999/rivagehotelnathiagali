
import { useEffect } from 'react';

type ToastProps = {
    type: "SUCCESS" | "ERROR",
    message: string,
    onClose: () => void
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000); // It's good practice to set a longer duration for accessibility, like 5000ms

        return () => clearTimeout(timer);
    }, [onClose]);

    // Apply a much higher z-index to ensure it's on top
    const styles = type === "SUCCESS"
        ? "fixed top-4 right-4 z-[9999] p-4 rounded-md bg-green-600 text-white max-w-md"
        : "fixed top-4 right-4 z-[9999] p-4 rounded-md bg-red-600 text-white max-w-md";

    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-sm md:text-lg lg:text-xl font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;