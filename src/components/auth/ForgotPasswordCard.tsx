"use client";

import { FormEvent } from "react";

import { Button } from "@/components/atoms/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuthStore } from "@/store/auth/useAuthStore";
import styles from "./ForgotPasswordCard.module.css";

type ForgotPasswordCardProps = {
  onBack: () => void;
  onContinue: () => void;
};

export function ForgotPasswordCard({ onBack, onContinue }: ForgotPasswordCardProps) {
  const assets = useAuthStore((state) => state.assets);
  const copy = useAuthStore((state) => state.copy.forgotPassword);
  const email = useAuthStore((state) => state.credentials.email);
  const setEmail = useAuthStore((state) => state.setEmail);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onContinue();
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
          <span>{copy.emailLabel}</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={copy.emailPlaceholder}
            autoComplete="email"
          />
        </label>
        <Button type="submit">{copy.continueLabel}</Button>
      </form>
    </div>
  );
}