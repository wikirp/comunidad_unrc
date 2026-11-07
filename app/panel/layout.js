import BarraComponent from "@/components/BarraComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Kali Colectivo",
  description: "El espacio para tu comunidad",
};

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <div>
        <main>{children}</main>
        <BarraComponent />
      </div>
    </ProtectedRoute>
  );
}
