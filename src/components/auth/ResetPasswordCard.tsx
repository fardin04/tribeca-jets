"use client";

import { FormEvent } from "react";

import { Button } from "@/components/atoms/Button";
import { PasswordToggle } from "@/components/atoms/PasswordToggle";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuthStore } from "@/store/auth/useAuthStore";
import styles from "./ResetPasswordCard.module.css";

type ResetPasswordCardProps = {
  onBack: () => void;
  onReset: () => void;
};

export function ResetPasswordCard({ onBack, onReset }: ResetPasswordCardProps) {
  const assets = useAuthStore((state) => state.assets);
  const copy = useAuthStore((state) => state.copy.resetPassword);
  const password = useAuthStore((state) => state.credentials.password);
  const confirmPassword = useAuthStore((state) => state.credentials.confirmPassword);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirmPassword = useAuthStore((state) => state.setConfirmPassword);
  const showPassword = useAuthStore((state) => state.showPassword);
  const togglePasswordVisibility = useAuthStore(
    (state) => state.togglePasswordVisibility,
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onReset();
  };

  return (
    <div className={styles.card}>
      <Button type="button" variant="text" className={styles.backButton} onClick={onBack}>
        <span aria-hidden="true">←</span> {copy.backLabel}
      </Button>
      <BrandLogo src={assets.logo} tone="dark" className={styles.logo} />
      <div className={styles.heading}>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          <span>{copy.newPasswordLabel}</span>
          <span className={styles.passwordControl}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={copy.passwordPlaceholder}
              autoComplete="new-password"
            />
            <PasswordToggle
              isVisible={showPassword}
              onToggle={togglePasswordVisibility}
            />
          </span>
        </label>
        <label className={styles.field}>
          <span>{copy.confirmPasswordLabel}</span>
          <span className={styles.passwordControl}>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder={copy.passwordPlaceholder}
              autoComplete="new-password"
            />
            <PasswordToggle
              isVisible={showPassword}
              onToggle={togglePasswordVisibility}
            />
          </span>
        </label>
        <Button type="submit">{copy.resetLabel}</Button>
      </form>
    </div>
  );
}
