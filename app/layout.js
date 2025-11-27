import { Nunito } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";
import { AuthContextProvider } from "@/hooks/useAuth";

const pokemon = localFont({
  src: "./pokemonh.ttf",
  variable: "--font-pokemon",
});

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
      <body className={`${pokemon.variable} ${nunito.variable}  `}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
