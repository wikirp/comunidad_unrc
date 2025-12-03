"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading, userData, loadingUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si ya terminó de cargar auth y NO hay usuario, patada al login
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    // Si hay usuario pero todavía estamos cargando los datos del API, esperamos
    if (!loading && user && loadingUserData) {
      return;
    }

    // Si hay usuario y los datos del API indican firstTime=true,
    // redirigimos a la página para completar el perfil
    if (!loading && user && userData && userData.firstTime === true) {
      router.push("/completar-perfil");
      return;
    }
  }, [user, loading, userData, loadingUserData, router]);

  // Mientras carga auth, no hay usuario, o estamos procesando la redirección,
  // no mostramos nada (evitamos parpadeos del panel)
  if (loading || !user || loadingUserData || (userData && userData.firstTime === true)) {
    return null; // O un componente <Spinner />
  }

  // Si hay usuario y no es firstTime, renderizamos el contenido protegido (el Dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;
