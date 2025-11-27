"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si ya terminó de cargar y NO hay usuario, patada al login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Mientras carga o si no hay usuario (para evitar flash de contenido), no mostramos nada o un spinner
  if (loading || !user) {
    return null; // O un componente <Spinner />
  }

  // Si hay usuario, renderizamos el contenido protegido (el Dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;
