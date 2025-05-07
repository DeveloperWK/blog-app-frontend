"use client"
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/app/context/AuthContext/AuthContext";

export const AuthProvider = ({children}) => {
const [user, setUser] = useState({
token: "",
    role: "",
    userId: "",
    isAuthenticated: false,
});
    useEffect(() => {
        // Only run on client side
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");

            if (token && role && userId) {
                setUser({
                    token,
                    role,
                    userId,
                    isAuthenticated: true,
                });
            }
        }
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (user.isAuthenticated && user.token) {
                localStorage.setItem("token", user.token);
                localStorage.setItem("role", user.role);
                localStorage.setItem("userId", user.userId);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("userId");
            }
        }
    }, [user]);
    const handleSignIn = ({ token, role, userId }) => {
        // Set cookies for server-side auth
        document.cookie = `token=${token}; path=/;`;
        document.cookie = `role=${role}; path=/;`;
        document.cookie = `userId=${userId}; path=/;`;

        // Update state
        setUser({
            token,
            role,
            userId,
            isAuthenticated: true,
        });
    };

    const handleSignOut = () => {
        // Clear cookies
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        // Clear localStorage
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
        }

        // Update state
        setUser({
            token: "",
            role: "",
            userId: "",
            isAuthenticated: false,
        });

        console.log("User signed out");
    };
    const hasRole = (requiredRole) => {
return user.role === requiredRole;
    }
    const value = {
        user,
        hasRole,
        signIn: handleSignIn,
        signOut: handleSignOut,
        isAuthenticated: user.isAuthenticated,
    }
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}