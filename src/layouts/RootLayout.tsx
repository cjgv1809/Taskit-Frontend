import { Outlet } from "react-router-dom";
import { ClerkProvider, SignedOut } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const localization = {
  socialButtonsBlockButton: "Continuar con {{provider}}",
  dividerText: "o",
  formFieldLabel__emailAddress: "Correo electrónico",
  formFieldLabel__password: "Contraseña",
  formFieldAction__forgotPassword: "¿Olvidaste tu contraseña?",
  formButtonPrimary: "Continuar",
  signIn: {
    start: {
      title: "Iniciar sesión",
      subtitle: "para continuar en {{applicationName}}",
      actionText: "¿No tienes una cuenta?",
      actionLink: "Regístrate",
    },
    password: {
      title: "Ingresa tu contraseña",
      subtitle: "para continuar en {{applicationName}}",
      actionText: "¿Olvidaste tu contraseña?",
      actionLink: "Restablecer contraseña",
    },
  },
  signUp: {
    start: {
      title: "Crear cuenta",
      subtitle: "para comenzar en {{applicationName}}",
      actionText: "¿Ya tienes una cuenta?",
      actionLink: "Iniciar sesión",
    },
    emailLink: {
      title: "Verifica tu correo",
      subtitle: "para continuar en {{applicationName}}",
      formTitle: "Enlace de verificación",
      formSubtitle:
        "Usa el enlace de verificación enviado a tu correo electrónico",
      resendButton: "Reenviar enlace",
      verified: {
        title: "Cuenta creada exitosamente",
      },
    },
  },
  userButton: {
    action__manageAccount: "Administrar cuenta",
    action__signOut: "Cerrar sesión",
  },
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      localization={localization}
    >
      <SignedOut>
        <Header />
      </SignedOut>
      <Outlet /> {/* This will render the nested routes */}
      <SignedOut>
        <Footer />
      </SignedOut>
    </ClerkProvider>
  );
}
