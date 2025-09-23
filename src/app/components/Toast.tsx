// import  { useEffect } from 'react'
// type ToastProps = {
//     type: "SUCCESS" | "ERROR",
//     message: string,
//     onClose: () => void
// }
// const Toast = ({ message, type, onClose }: ToastProps) => {
//     // const styles = type === "SUCCESS" ? "bg-green-600 text-sm" : "bg-green-600 text-sm"
//      useEffect(() => {
//         const timer =    setTimeout(() => {
//             onClose()
//         }, 2000)
//         return () =>     clearTimeout(timer)
        

//     },[onClose]);
//     const styles = type === "SUCCESS" ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
//       : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";
//     return (
//         <div className={styles}>
//            <div className="flex justify-center items-center">
//         <span className="text-lg font-semibold">{message}</span>
//       </div>
//         </div>
//     )
// }

// export default Toast
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
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;