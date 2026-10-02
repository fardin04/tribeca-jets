import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "text";
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}