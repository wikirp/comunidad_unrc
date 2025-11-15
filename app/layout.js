import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
});

export const metadata = {
  title: "Comunidad UNRC",
  description: "La incomodidad es el precio de la Comunidad ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} `}>{children}</body>
    </html>
  );
}
