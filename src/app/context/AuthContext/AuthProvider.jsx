"use client";
import AuthContext from "@/app/context/AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: "",
    role: "",
    userId: "",
    isAuthenticated: false,
  });
  useEffect(() => {
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
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
      document.cookie = `token=${token}; path=/; httpOnly;`;
      document.cookie = `role=${role}; path=/; httpOnly;`;
      document.cookie = `userId=${userId}; path=/; httpOnly;`;
    } else {
      document.cookie = `token=${token}; path=/;`;
      document.cookie = `role=${role}; path=/;`;
      document.cookie = `userId=${userId}; path=/;`;
    }
    setUser({
      token,
      role,
      userId,
      isAuthenticated: true,
    });
  };

  const handleSignOut = () => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
      document.cookie =
        "token=; path=/; httpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "role=; path=/; httpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "userId=; path=/; httpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } else {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    }

    setUser({
      token: "",
      role: "",
      userId: "",
      isAuthenticated: false,
    });
  };
  const hasRole = (requiredRole) => {
    return user.role === requiredRole;
  };
  const value = {
    user,
    hasRole,
    signIn: handleSignIn,
    signOut: handleSignOut,
    isAuthenticated: user.isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
