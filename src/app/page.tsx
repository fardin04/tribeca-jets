"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { AppImage } from "@/components/atoms/AppImage";
import { Button } from "@/components/atoms/Button";
import { ForgotPasswordCard } from "@/components/auth/ForgotPasswordCard";
import { PasswordToggle } from "@/components/atoms/PasswordToggle";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ResetPasswordCard } from "@/components/auth/ResetPasswordCard";
import { SuccessCard } from "@/components/auth/SuccessCard";
import { TwoFactorCard } from "@/components/auth/TwoFactorCard";
import { VerifyEmailCard } from "@/components/auth/VerifyEmailCard";
import { authViewParamSchema } from "@/schemas/auth/auth-params.schema";
import { useAuthStore } from "@/store/auth/useAuthStore";
import styles from "./page.module.css";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSplashVisible, setIsSplashVisible] = useState(
    () => !searchParams.get("view"),
  );
  const view = authViewParamSchema.parse(searchParams.get("view"));
  const email = useAuthStore((state) => state.credentials.email);
  const password = useAuthStore((state) => state.credentials.password);
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const showPassword = useAuthStore((state) => state.showPassword);
  const assets = useAuthStore((state) => state.assets);
  const copy = useAuthStore((state) => state.copy);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const toggleRememberMe = useAuthStore((state) => state.toggleRememberMe);
  const togglePasswordVisibility = useAuthStore(
    (state) => state.togglePasswordVisibility,
  );

  useEffect(() => {
    if (!isSplashVisible) {
      return;
    }

    const transitionTimer = window.setTimeout(() => {
      setIsSplashVisible(false);
    }, 800);

    return () => window.clearTimeout(transitionTimer);
  }, [isSplashVisible]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/?view=two-factor");
  };

  return (
    <main className={styles.page} data-screen={isSplashVisible ? "splash" : view}>
      <section className={styles.splashScreen} aria-label="Tribeca Jets welcome">
        <AppImage
          src={assets.splash}
          alt="Tribeca Jets aircraft on the runway"
          fill
          priority
          sizes="100vw"
          className={styles.splashImage}
        />
      </section>

      <section className={styles.signInScreen} aria-label={view === "two-factor" ? "Two-factor authentication" : view === "success" || view === "reset-success" ? "Verification successful" : view === "forgot-password" ? "Forgot password" : view === "verify-email" ? "Verify email" : view === "reset-password" ? "Reset password" : "Sign in"}>
        <div className={styles.brandPanel}>
          <AppImage
            src={assets.splash}
            alt=""
            fill
            sizes="50vw"
            className={styles.brandPanelImage}
          />
          <div className={styles.brandPanelShade} />
          <BrandLogo src={assets.logo} tone="light" className={styles.panelLogo} />
          <div className={styles.brandMessage}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.heading}</h1>
            <p className={styles.brandDescription}>{copy.description}</p>
            <div className={styles.metrics}>
              {copy.metrics.map((metric) => (
                <div className={styles.metric} key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formPanel}>
          {view === "two-factor" ? (
            <TwoFactorCard
              onBack={() => router.push("/?view=signin")}
              onVerify={() => router.push("/?view=success")}
            />
          ) : view === "success" ? (
            <SuccessCard onContinue={() => undefined} />
          ) : view === "forgot-password" ? (
            <ForgotPasswordCard
              onBack={() => router.push("/?view=signin")}
              onContinue={() => router.push("/?view=verify-email")}
            />
          ) : view === "verify-email" ? (
            <VerifyEmailCard
              onBack={() => router.push("/?view=forgot-password")}
              onVerify={() => router.push("/?view=reset-password")}
            />
          ) : view === "reset-password" ? (
            <ResetPasswordCard
              onBack={() => router.push("/?view=verify-email")}
              onReset={() => router.push("/?view=reset-success")}
            />
          ) : view === "reset-success" ? (
            <SuccessCard
              variant="password"
              onContinue={() => router.push("/?view=signin")}
            />
          ) : (
          <div className={styles.formCard}>
            <BrandLogo src={assets.logo} tone="dark" className={styles.formLogo} />
            <div className={styles.formHeading}>
              <h2>{copy.signInTitle}</h2>
              <p>{copy.signInSubtitle}</p>
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
              <label className={styles.field}>
                <span>{copy.passwordLabel}</span>
                <span className={styles.passwordControl}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={copy.passwordPlaceholder}
                    autoComplete="current-password"
                  />
                  <PasswordToggle
                    isVisible={showPassword}
                    onToggle={togglePasswordVisibility}
                  />
                </span>
              </label>
              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                  />
                  <span>{copy.rememberMe}</span>
                </label>
                <Link href="/?view=forgot-password">{copy.forgotPasswordLink}</Link>
              </div>
              <Button type="submit">{copy.submitLabel}</Button>
            </form>
          </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<main className={styles.page} />}>
      <HomeContent />
    </Suspense>
  );
}
