"use client";

import { FormEvent } from "react";

import { Button } from "@/components/atoms/Button";
import { VerificationCodeInputs } from "@/components/atoms/VerificationCodeInputs";
import { useAuthStore } from "@/store/auth/useAuthStore";
import styles from "./TwoFactorCard.module.css";

type TwoFactorCardProps = {
  onBack: () => void;
  onVerify: () => void;
};

export function TwoFactorCard({ onBack, onVerify }: TwoFactorCardProps) {
  const copy = useAuthStore((state) => state.copy.twoFactor);
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
      <h2>{copy.title}</h2>
      <p className={styles.description}>{copy.description}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <VerificationCodeInputs
          code={verificationCode}
          label="Verification code"
          onDigitChange={setVerificationDigit}
        />
        <a href="#resend-code" className={styles.resendLink}>
          {copy.resendLabel}
        </a>
        <Button type="submit">{copy.verifyLabel}</Button>
      </form>
      <a href="#backup-code" className={styles.backupLink}>
        {copy.backupLabel}
      </a>
    </div>
  );
}