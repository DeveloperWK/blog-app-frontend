"use client";
import { createContext } from "react";
const AuthContext = createContext({
  user: {
    token: "",
    role: "",
    userId: "",
    isAuthenticated: false,
  },
  signIn: ({ token, role, userId }) => {},
  signOut: () => {},
  hasRole: ({ requiredRole }) => false,
  isAuthenticated: false,
});
export default AuthContext;
