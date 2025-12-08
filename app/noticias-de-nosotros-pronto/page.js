"use client";

import Link from "next/link";

const NoticiasDeNosotrosProntoPage = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fdfffc",
        textAlign: "center",
        padding: "1.5rem",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-pokemon)",
          color: "#9f2241",
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          textDecoration: "none",
        }}
      >
        Kalli Colectivof
      </Link>

      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
        Noticias de Nosotros Pronto
      </h1>
      <p style={{ fontSize: "1rem", maxWidth: "26rem" }}>
        Gracias por completar tu registro. Muy pronto estaremos compartiendo
        noticias de nosotros por aquí.
      </p>
    </main>
  );
};

export default NoticiasDeNosotrosProntoPage;



