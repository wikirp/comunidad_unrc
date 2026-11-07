import Link from "next/link";

export default function RightDefault() {
  return (
    <div style={{ fontFamily: "monospace", textAlign: "center", paddingTop: "2rem" }}>
      <p style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>CONSOLA EN ESPERA...</p>
      <Link
        href="/login"
        style={{
          display: "inline-block",
          border: "2px solid #55efc4",
          color: "#55efc4",
          padding: "6px 12px",
          textDecoration: "none",
          fontSize: "0.8rem",
        }}
      >
        &gt; INICIAR SESIÓN
      </Link>
    </div>
  );
}