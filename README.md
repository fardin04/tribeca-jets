# Tribeca Jets Command Center

Frontend-only authentication experience for Tribeca Jets, built with Next.js 16, React, TypeScript, Zustand, and CSS Modules.

The current work covers the complete visual authentication journey from the splash screen through sign-in, verification, password reset, and reset completion. No backend, API, database, real authentication, email delivery, or password persistence has been added yet.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Completed Screens

The application uses the `view` URL query parameter to select each authentication state. Direct deep links render the requested state without replaying the splash screen.

| Screen | URL | Status |
| --- | --- | --- |
| Splash screen and initial sign-in | `/?view=signin` or `/` | Complete |
| Two-factor authentication | `/?view=two-factor` | Complete |
| Account verification success | `/?view=success` | Complete |
| Forgot password | `/?view=forgot-password` | Complete |
| Verify email reset code | `/?view=verify-email` | Complete |
| Reset password | `/?view=reset-password` | Complete |
| Password reset success | `/?view=reset-success` | Complete |

### Initial Splash Flow

Opening `/` displays the Tribeca Jets aircraft splash screen for 800ms, then transitions to sign-in with a 300ms ease-out animation.

Opening any explicit `?view=...` URL skips the splash so the requested screen is immediately accessible.

### Sign-in Flow

1. Enter an email and password.
2. Toggle password visibility.
3. Toggle Remember me.
4. Select Forgot password to open `/?view=forgot-password`.
5. Submit sign-in to open `/?view=two-factor`.

### Two-factor Flow

1. Enter a six-digit verification code.
2. Inputs automatically move forward after each digit.
3. Backspace moves to the previous input when appropriate.
4. Verify & Sign In opens `/?view=success`.
5. Go Back returns to `/?view=signin`.

### Password Recovery Flow

1. Forgot password opens `/?view=forgot-password`.
2. Enter an email address.
3. Continue opens `/?view=verify-email`.
4. Enter the six-digit email verification code.
5. Verify email opens `/?view=reset-password`.
6. Enter and confirm a new password.
7. Reset Password opens `/?view=reset-success`.
8. Continue to Sign in returns to `/?view=signin`.

These transitions are frontend-only. Buttons currently demonstrate the intended UI flow and do not call a backend.

## Project Structure

```text
src/
├── app/
│   ├── globals.css                 Global reset, colors, typography, and page defaults
│   ├── layout.tsx                  Root layout and Tribeca Jets metadata
│   ├── page.tsx                    Splash and URL-driven authentication shell
│   └── page.module.css             Split-screen layout and screen transitions
├── components/
│   ├── atoms/
│   │   ├── AppImage.tsx             next/image wrapper with explicit image handling
│   │   ├── Button.tsx               Shared button behavior and variants
│   │   ├── PasswordToggle.tsx       Shared password visibility control
│   │   └── VerificationCodeInputs.tsx Shared six-digit input behavior
│   ├── auth/
│   │   ├── ForgotPasswordCard.tsx
│   │   ├── ResetPasswordCard.tsx
│   │   ├── SuccessCard.tsx
│   │   ├── TwoFactorCard.tsx
│   │   └── VerifyEmailCard.tsx
│   └── brand/
│       └── BrandLogo.tsx            Reusable supplied Tribeca Jets logo asset
├── data/
│   └── auth/auth.data.ts             Auth copy and image asset paths
├── lib/
│   └── cn.ts                        clsx and tailwind-merge helper
├── schemas/
│   └── auth/auth-params.schema.ts   Zod validation for authentication view params
└── store/
    └── auth/useAuthStore.ts         Auth form state, verification code, and actions

public/
└── images/auth/
    ├── logo.png                     Supplied Tribeca Jets logo
    └── splash-screen.png             Supplied aircraft splash background
```

## URL State

Authentication view state is validated by `authViewParamSchema` and stored in the URL rather than local component state:

```text
signin
 two-factor
 success
 forgot-password
 verify-email
 reset-password
 reset-success
```

The Zustand auth store owns frontend form values, password visibility, Remember me state, verification digits, copy, and asset paths. Components read state through store selectors and do not import data files directly.

## Design and Implementation Notes

- The supplied aircraft image is reused for the splash and left-side brand panel.
- The supplied logo is rendered through the reusable `BrandLogo` component.
- Images are rendered through `next/image` via `AppImage`; raw `<img>` is not used.
- Auth copy and asset paths live in `src/data`, not inside page components.
- Authentication forms and verification screens are split into reusable feature components.
- The six-digit input interaction is shared between 2FA and email verification.
- Layouts are responsive and collapse for smaller viewports.
- The UI is frontend-only and intentionally does not claim successful backend authentication.

## Validation

```bash
npm run lint
npm run build
```

Both commands currently pass.

## Dependencies

- Next.js `16.3.8`
- React `19.2.8`
- TypeScript `5`
- Zustand `5`
- Zod `4`
- `clsx` and `tailwind-merge`

## Next Work

The next screens can continue using the same `view` URL pattern. A dashboard, real authentication, API integration, email delivery, password validation, and backend error states still need to be designed and implemented.
