import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Comunidad UNRC",
  description: "La incomodidad es el precio de la Comunidad ",
};

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <div>
        <nav></nav>
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
