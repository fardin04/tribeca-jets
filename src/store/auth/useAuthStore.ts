import { create } from "zustand";

import { authData } from "@/data/auth/auth.data";

type AuthState = {
  assets: typeof authData.assets;
  copy: typeof authData.copy;
  credentials: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  rememberMe: boolean;
  showPassword: boolean;
  verificationCode: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  toggleRememberMe: () => void;
  togglePasswordVisibility: () => void;
  setVerificationDigit: (index: number, digit: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  assets: authData.assets,
  copy: authData.copy,
  credentials: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  rememberMe: false,
  showPassword: false,
  verificationCode: "",
  setEmail: (email) => set((state) => ({ credentials: { ...state.credentials, email } })),
  setPassword: (password) =>
    set((state) => ({ credentials: { ...state.credentials, password } })),
  setConfirmPassword: (confirmPassword) =>
    set((state) => ({ credentials: { ...state.credentials, confirmPassword } })),
  toggleRememberMe: () => set((state) => ({ rememberMe: !state.rememberMe })),
  togglePasswordVisibility: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  setVerificationDigit: (index, digit) =>
    set((state) => {
      const code = state.verificationCode.padEnd(6, " ").split("");
      code[index] = digit.slice(-1);
      return { verificationCode: code.join("").trimEnd() };
    }),
}));