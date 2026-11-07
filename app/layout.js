import { Nunito } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "@/hooks/useAuth";
import PokedexComponent from "@/components/PokedexComponent";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Castemones",
  description: "El espacio para tu comunidad",
};

export default function RootLayout({ left, right }) {
  return (
    <html lang="es">
      <body className={`${nunito.variable}`}>
        <AuthContextProvider>
          <PokedexComponent
            leftScreen={
              <div className="screenBezel screenBezelLeft">
                <div className="screenDisplay screenDisplayLeft">{left}</div>
              </div>
            }
            rightScreen={
              <div className="screenBezel screenBezelRight">
                <div className="screenDisplay screenDisplayRight">{right}</div>
              </div>
            }
          />
        </AuthContextProvider>
      </body>
    </html>
  );
}
