"use client";

import { Button } from "@/components/atoms/Button";
import { useAuthStore } from "@/store/auth/useAuthStore";
import styles from "./SuccessCard.module.css";

type SuccessCardProps = {
  variant?: "account" | "password";
  onContinue: () => void;
};

export function SuccessCard({ variant = "account", onContinue }: SuccessCardProps) {
  const copy = useAuthStore((state) =>
    variant === "password" ? state.copy.resetSuccess : state.copy.success,
  );

  return (
    <div className={styles.card}>
      <div className={styles.successIcon} aria-hidden="true">
        <span>✓</span>
      </div>
      <h2>{copy.title}</h2>
      <p>{copy.description}</p>
      <Button type="button" onClick={onContinue}>
        {copy.continueLabel}
      </Button>
    </div>
  );
}