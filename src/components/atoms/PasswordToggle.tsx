import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import styles from "./PasswordToggle.module.css";

type PasswordToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  isVisible: boolean;
  onToggle: () => void;
};

export function PasswordToggle({ isVisible, onToggle, className, ...props }: PasswordToggleProps) {
  return (
    <button
      type="button"
      className={cn(styles.toggle, className)}
      onClick={onToggle}
      aria-label={isVisible ? "Hide password" : "Show password"}
      {...props}
    >
      <span aria-hidden="true" />
    </button>
  );
}