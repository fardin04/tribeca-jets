"use client";

import { useRef } from "react";

import styles from "./VerificationCodeInputs.module.css";

type VerificationCodeInputsProps = {
  code: string;
  label: string;
  onDigitChange: (index: number, digit: string) => void;
};

const CODE_LENGTH = 6;

export function VerificationCodeInputs({ code, label, onDigitChange }: VerificationCodeInputsProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    onDigitChange(index, digit);
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.inputs} aria-label={label}>
      {Array.from({ length: CODE_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[index] ?? ""}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event.key)}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}