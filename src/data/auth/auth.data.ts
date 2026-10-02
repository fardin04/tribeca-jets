export const authData = {
  assets: {
    logo: "/images/auth/logo.png",
    splash: "/images/auth/splash-screen.png",
  },
  copy: {
    eyebrow: "Command Center",
    heading: "Private aviation.\nPrecision execution.",
    description:
      "Your integrated workspace for managing flights, charter trips, operators, and revenue - built for professional brokers.",
    metrics: [
      { label: "Active Clients", value: "240+" },
      { label: "YTD Revenue", value: "$18M" },
      { label: "Trip Success", value: "96%" },
    ],
    signInTitle: "Sign in",
    signInSubtitle: "Access the Tribeca Jets Command Center",
    emailLabel: "Email address",
    emailPlaceholder: "you@tribecajets.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPasswordLink: "Forgot password?",
    submitLabel: "Sign in",
    twoFactor: {
      backLabel: "Go Back",
      title: "Two-Factor\nAuthentication",
      description:
        "Enter the 6-digit code from your authenticator app to verify it's really you.",
      resendLabel: "Didn't receive it? Resend code",
      verifyLabel: "Verify & Sign In",
      backupLabel: "Trouble signing in? Use a backup code instead",
    },
    success: {
      title: "You're all set",
      description:
        "Your Tribeca Jets Command Center account is verified and ready to go.",
      continueLabel: "Continue to Dashboard",
    },
    resetSuccess: {
      title: "You're all set",
      description:
        "Your Tribeca Jets Command Center password is changed and ready to go.",
      continueLabel: "Continue to Sign in",
    },
    forgotPassword: {
      backLabel: "Go Back",
      title: "Forgot Password?",
      description:
        "If you need help resetting your password, we can help by sending you a link to reset it.",
      emailLabel: "Email address",
      emailPlaceholder: "you@tribecajets.com",
      continueLabel: "Continue",
    },
    verifyEmail: {
      backLabel: "Go Back",
      description: "we sent a 6-digit code to",
      resendLabel: "Didn't receive it ?",
      resendAction: "Resend code",
      verifyLabel: "Verify email",
    },
    resetPassword: {
      backLabel: "Go Back",
      title: "Reset Password?",
      description:
        "Please enter a new password for your account. Use a strong password to keep your account secure.",
      newPasswordLabel: "New Password",
      confirmPasswordLabel: "Confirm Password",
      passwordPlaceholder: "Enter your password",
      resetLabel: "Reset Password",
    },
  },
} as const;