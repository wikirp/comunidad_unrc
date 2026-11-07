export default function CastemonesLeftPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "1rem 0.5rem",
        boxSizing: "border-box",
        textAlign: "center",
        fontFamily: "monospace",
        userSelect: "none",
      }}
    >
      {/* Indicador superior de terminal */}
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "2px",
          color: "rgba(85, 239, 196, 0.7)",
          borderBottom: "1px dashed rgba(85, 239, 196, 0.3)",
          width: "100%",
          paddingBottom: "0.4rem",
        }}
      >
        [ SISTEMA CASTEMON v1.0 ]
      </div>

      {/* Bloque central: Logo e Ícono */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          margin: "auto 0",
        }}
      >
        {/* LOGO CASTEMONES ESTILO POKÉMON EN SVG */}
        <svg
          viewBox="0 0 320 85"
          style={{
            width: "100%",
            maxWidth: "260px",
            filter: "drop-shadow(0 4px 0px #102a45)",
          }}
        >
          <defs>
            {/* Gradiente amarillo característico del logo */}
            <linearGradient id="pokeYellow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff200" />
              <stop offset="65%" stopColor="#ffcc00" />
              <stop offset="100%" stopColor="#d48800" />
            </linearGradient>

            {/* Sombra azul profunda */}
            <linearGradient id="pokeBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a75bb" />
              <stop offset="100%" stopColor="#1a4373" />
            </linearGradient>
          </defs>

          {/* Capa 1: Borde azul exterior grueso (Stroke) */}
          <text
            x="50%"
            y="58"
            textAnchor="middle"
            fill="none"
            stroke="url(#pokeBlue)"
            strokeWidth="14"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              fontFamily: "'Arial Black', 'Impact', sans-serif",
              fontSize: "36px",
              fontStyle: "italic",
              fontWeight: "900",
              letterSpacing: "3px",
            }}
          >
            CASTEMONES
          </text>

          {/* Capa 2: Relleno amarillo con bisel fino oscuro */}
          <text
            x="50%"
            y="58"
            textAnchor="middle"
            fill="url(#pokeYellow)"
            stroke="#1b3f6b"
            strokeWidth="3"
            style={{
              fontFamily: "'Arial Black', 'Impact', sans-serif",
              fontSize: "36px",
              fontStyle: "italic",
              fontWeight: "900",
              letterSpacing: "3px",
            }}
          >
            CASTEMONES
          </text>
        </svg>

        {/* Emblema retro central (Pokébola vectorial en pixel/flat) */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          style={{ filter: "drop-shadow(0 0 10px rgba(85, 239, 196, 0.35))" }}
        >
          {/* Mitad superior roja */}
          <path
            d="M 4 32 A 28 28 0 0 1 60 32 Z"
            fill="#e74c3c"
            stroke="#1c1c1c"
            strokeWidth="4"
          />
          {/* Mitad inferior blanca */}
          <path
            d="M 4 32 A 28 28 0 0 0 60 32 Z"
            fill="#f5f6fa"
            stroke="#1c1c1c"
            strokeWidth="4"
          />
          {/* Franja central negra */}
          <line
            x1="4"
            y1="32"
            x2="60"
            y2="32"
            stroke="#1c1c1c"
            strokeWidth="4"
          />
          {/* Botón central */}
          <circle cx="32" cy="32" r="9" fill="#1c1c1c" />
          <circle
            cx="32"
            cy="32"
            r="5"
            fill="#f5f6fa"
            stroke="#1c1c1c"
            strokeWidth="2"
          />
          <circle cx="30" cy="30" r="1.5" fill="#ffffff" />
        </svg>

        {/* Lema en fuente monoespaciada de alto contraste */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              color: "#55efc4",
              textShadow: "0 0 8px rgba(85, 239, 196, 0.6)",
            }}
          >
            ¡ÚNETE Y ATRÁPALOS A TODOS!
          </p>
          <span
            style={{
              fontSize: "0.68rem",
              color: "#dfe6e9",
              opacity: 0.85,
            }}
          >
            Descubre a tus compañeros y sincroniza afinidades.
          </span>
        </div>
      </div>

      {/* Barra inferior decorativa */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <span
          style={{ width: "24px", height: "3px", backgroundColor: "#ff4d4d" }}
        />
        <span
          style={{ width: "24px", height: "3px", backgroundColor: "#ffcc00" }}
        />
        <span
          style={{ width: "24px", height: "3px", backgroundColor: "#2ecc71" }}
        />
      </div>
    </div>
  );
}
