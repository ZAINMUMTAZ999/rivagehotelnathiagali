"use client";
import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import {  validateToken } from "../Api";

type toastMessage = {
    type: "SUCCESS" | "ERROR",
    message: string
};

// type User = {
//     userId: string;
//     role: string;
// };
// In your frontend Context API
type User = {
 userId: string;
 role: string; // This is correct
};
type AppNotify = {
    showToast: (toastMessage: toastMessage) => void;
    isLogged: boolean;
    user: User | null;
    isAdmin: boolean;
    isUser: boolean;
    isLoading: boolean;
};

const AppNotifyContext = React.createContext<AppNotify | undefined>(undefined);

export const AppNotifyProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<toastMessage | undefined>(undefined);
    
const { data: userData, isError, isLoading } = useQuery({
  queryKey: ["validateToken"],     // <-- array required
  queryFn: validateToken,          // <-- your API call function
  retry: false,                    // optional settings
  staleTime: 5 * 60 * 1000,
//   cacheTime: 10 * 60 * 1000,
});



 

    const user = userData || null;
    console.log("user",user)
    // Fixed: Don't consider loading state for isLogged - only check if we have valid user data and no error
    const isLogged = !isError && !!user;
    const isAdmin = isLogged && user?.role === "admin";
    console.log("isAdmin",isAdmin)
    const isUser = isLogged && user?.role === "user";
    console.log("isUSer",isUser)

    const contextValue = {
        showToast: (m: toastMessage) => setToast(m),
        isLogged,
        user,
        isAdmin,
        isUser,
        isLoading
    };

    return (
        <AppNotifyContext.Provider value={contextValue}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppNotifyContext.Provider>
    );
};

// Fixed: This should be a hook, not calling the context directly
export const AppContext = () => {
    const context = useContext(AppNotifyContext);
    if (context === undefined) {
        throw new Error('AppContext must be used within an AppNotifyProvider');
    }
    return context;
};

// Role-based component wrappers - Fixed to use the hook properly
export const AdminOnly = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin, isLogged } = AppContext();
    
    if (!isLogged || !isAdmin) {
        return null; // Don't render anything if not admin
    }
    
    return <>{children}</>;
};

export const UserOnly = ({ children }: { children: React.ReactNode }) => {
    const { isUser, isLogged } = AppContext();
    
    if (!isLogged || !isUser) {
        return null; // Don't render anything if not user
    }
    
    return <>{children}</>;
};

export const AuthenticatedOnly = ({ children }: { children: React.ReactNode }) => {
    const { isLogged } = AppContext();
    
    if (!isLogged) {
        return null; // Don't render anything if not logged in
    }
    
    return <>{children}</>;
};

export const GuestOnly = ({ children }: { children: React.ReactNode }) => {
    const { isLogged } = AppContext();
    
    if (isLogged) {
        return null; // Don't render anything if logged in
    }
    
    return <>{children}</>;
};

// Hook for role checking - This is the one you should use in your router

export const useAuth = () => {
    const context = AppContext();
    
    return {
        ...context,
        hasRole: (role: string) => context.user?.role === role,
        hasAnyRole: (roles: string[]) => roles.includes(context.user?.role || ''),
        canAccess: (allowedRoles: string[]) => {
            if (!context.isLogged || !context.user) return false;
            return allowedRoles.includes(context.user.role);
        }
    };
};