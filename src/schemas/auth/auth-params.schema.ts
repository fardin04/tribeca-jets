import { z } from "zod";

export const authViewParamSchema = z
  .enum([
    "signin",
    "two-factor",
    "success",
    "forgot-password",
    "verify-email",
    "reset-password",
    "reset-success",
  ])
  .catch("signin");