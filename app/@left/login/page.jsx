export default function LoginLeftPage() {
  return (
    <div style={{ textAlign: "center", padding: "1.5rem" }}>
      <h2
        style={{
          fontFamily: "monospace",
          fontSize: "1.1rem",
          color: "#55efc4", // Verde menta brillante
          textShadow: "0 0 8px rgba(85, 239, 196, 0.4)", // Leve resplandor LCD
          letterSpacing: "1px",
          marginBottom: "0.5rem",
        }}
      >
        IDENTIFICACIÓN DE ENTRENADOR
      </h2>
      <div
        style={{
          width: "48px",
          height: "4px",
          backgroundColor: "#ff4d4d",
          margin: "0 auto 1rem auto",
        }}
      />
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#dfe6e9", // Gris claro casi blanco
          lineHeight: "1.4",
        }}
      >
        Ingresa tus credenciales para sincronizar tu criatura de campus.
      </p>
    </div>
  );
}