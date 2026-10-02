"use client";

import { FormEvent } from "react";

import { Button } from "@/components/atoms/Button";
import { VerificationCodeInputs } from "@/components/atoms/VerificationCodeInputs";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuthStore } from "@/store/auth/useAuthStore";
import styles from "./VerifyEmailCard.module.css";

type VerifyEmailCardProps = {
  onBack: () => void;
  onVerify: () => void;
};

export function VerifyEmailCard({ onBack, onVerify }: VerifyEmailCardProps) {
  const assets = useAuthStore((state) => state.assets);
  const copy = useAuthStore((state) => state.copy.verifyEmail);
  const email = useAuthStore((state) => state.credentials.email);
  const verificationCode = useAuthStore((state) => state.verificationCode);
  const setVerificationDigit = useAuthStore((state) => state.setVerificationDigit);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onVerify();
  };

  return (
    <div className={styles.card}>
      <Button type="button" variant="text" className={styles.backButton} onClick={onBack}>
        <span aria-hidden="true">←</span> {copy.backLabel}
      </Button>
      <BrandLogo src={assets.logo} tone="dark" className={styles.logo} />
      <h2>Verify your email</h2>
      <p className={styles.description}>
        {copy.description} <strong>{email || "you@gmail.com"}</strong>
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <VerificationCodeInputs
          code={verificationCode}
          label="Email verification code"
          onDigitChange={setVerificationDigit}
        />
        <div className={styles.resend}>
          <span>{copy.resendLabel}</span>
          <a href="#resend-code">{copy.resendAction}</a>
        </div>
        <Button type="submit">{copy.verifyLabel}</Button>
      </form>
    </div>
  );
}
