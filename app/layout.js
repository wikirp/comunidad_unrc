import { Nunito } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "@/hooks/useAuth";

const nunito = Nunito({
  variable: "--font-nunito",
});

export const metadata = {
  title: "Comunidad UNRC",
  description: "La incomodidad es el precio de la Comunidad ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={` ${nunito.variable}  `}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
