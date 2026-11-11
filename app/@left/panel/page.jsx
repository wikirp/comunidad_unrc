"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function drawStatusLed(ctx, cx, cy, radius, innerColor, outerColor) {
  // Sombra exterior del LED
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx + 2, cy + 2, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fill();
  ctx.restore();

  // Gradiente radial del LED
  const grad = ctx.createRadialGradient(
    cx - radius * 0.3,
    cy - radius * 0.3,
    radius * 0.15,
    cx,
    cy,
    radius
  );
  grad.addColorStop(0, innerColor);
  grad.addColorStop(0.85, outerColor);

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#1a1a1a";
  ctx.stroke();
}

export default function LeftPanelPage() {
  const { userData } = useAuth();
  const [sharing, setSharing] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const profile = userData?.profile || userData || {};
  const graficoUrl =
    profile?.grafico_url || userData?.grafico_url || profile?.avatar_url || "";
  const trainerName = profile?.username || profile?.nombre || "castemon";

  const handleShareInstagram = async () => {
    if (sharing || !graficoUrl) return;
    setSharing(true);
    setShareMsg("");

    try {
      const width = 1080;
      const height = 1350;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // 1. Chasis rojo de la Pokédex (.pokedexDevice / .leftPanel)
      const bodyX = 16;
      const bodyY = 16;
      const bodyW = width - 32;
      const bodyH = height - 32;

      drawRoundedRect(ctx, bodyX, bodyY, bodyW, bodyH, 44);
      ctx.fillStyle = "#dc0a2d";
      ctx.fill();

      // Bisel interior de luz/sombra del chasis rojo
      ctx.save();
      ctx.clip();
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#ff5964";
      ctx.strokeRect(bodyX + 6, bodyY + 6, bodyW, bodyH);
      ctx.strokeStyle = "#5c0000";
      ctx.strokeRect(bodyX - 6, bodyY - 8, bodyW, bodyH);
      ctx.restore();

      // Borde negro exterior del chasis
      drawRoundedRect(ctx, bodyX, bodyY, bodyW, bodyH, 44);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#1a1a1a";
      ctx.stroke();

      // 2. Cabecera superior (.topHeader): Lente azul y 3 luces LED
      const lensCenterX = 135;
      const lensCenterY = 125;
      const ringRadius = 68;
      const lensRadius = 50;

      // Sombra del anillo plateado
      ctx.beginPath();
      ctx.arc(lensCenterX + 4, lensCenterY + 4, ringRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fill();

      // Anillo exterior plateado (.mainLensRing)
      ctx.beginPath();
      ctx.arc(lensCenterX, lensCenterY, ringRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#dedede";
      ctx.fill();
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#1a1a1a";
      ctx.stroke();

      // Lente azul brillante (.mainLens)
      const lensGrad = ctx.createRadialGradient(
        lensCenterX - lensRadius * 0.3,
        lensCenterY - lensRadius * 0.3,
        lensRadius * 0.15,
        lensCenterX,
        lensCenterY,
        lensRadius
      );
      lensGrad.addColorStop(0, "#9ae2ff");
      lensGrad.addColorStop(0.55, "#0084ff");
      lensGrad.addColorStop(0.95, "#004b91");

      ctx.save();
      ctx.shadowColor = "rgba(0, 132, 255, 0.65)";
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.arc(lensCenterX, lensCenterY, lensRadius, 0, Math.PI * 2);
      ctx.fillStyle = lensGrad;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(lensCenterX, lensCenterY, lensRadius, 0, Math.PI * 2);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#083b66";
      ctx.stroke();

      // 3 LEDs de estado (.statusLeds: rojo, amarillo, verde)
      const ledY = 82;
      const ledRadius = 17;
      drawStatusLed(ctx, 248, ledY, ledRadius, "#ff8a8a", "#e60000");
      drawStatusLed(ctx, 298, ledY, ledRadius, "#fffb8a", "#ffd000");
      drawStatusLed(ctx, 348, ledY, ledRadius, "#9aff8a", "#00cc22");

      // 3. Línea divisoria horizontal (.panelDivider)
      const dividerY = 222;
      ctx.fillStyle = "#5c0000";
      ctx.fillRect(bodyX + 5, dividerY, bodyW - 10, 9);
      ctx.fillStyle = "#ff5964";
      ctx.fillRect(bodyX + 5, dividerY + 9, bodyW - 10, 5);

      // 4. Marco gris de la pantalla (.screenBezel)
      const bezelX = 64;
      const bezelY = 266;
      const bezelW = width - 128;
      const bezelH = height - bezelY - 68;

      drawRoundedRect(ctx, bezelX, bezelY, bezelW, bezelH, 28);
      ctx.fillStyle = "#dedede";
      ctx.fill();

      // Bisel interior 3D del marco gris
      ctx.save();
      ctx.clip();
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(bezelX + 4, bezelY + 4, bezelW, bezelH);
      ctx.strokeStyle = "#888888";
      ctx.strokeRect(bezelX - 4, bezelY - 4, bezelW, bezelH);
      ctx.restore();

      drawRoundedRect(ctx, bezelX, bezelY, bezelW, bezelH, 28);
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#1c1c1c";
      ctx.stroke();

      // 5. Pantalla interior verde oscuro (.screenDisplay)
      const screenPad = 28;
      const screenX = bezelX + screenPad;
      const screenY = bezelY + screenPad;
      const screenW = bezelW - screenPad * 2;
      const screenH = bezelH - screenPad * 2;

      drawRoundedRect(ctx, screenX, screenY, screenW, screenH, 16);
      ctx.fillStyle = "#232d27";
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#0f1411";
      ctx.stroke();

      // 6. Imagen limpia de grafico_url centrada dentro de la pantalla
      const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(
        graficoUrl
      )}`;
      const img = await loadImage(proxiedUrl);

      const imgPad = 24;
      const availW = screenW - imgPad * 2;
      const availH = screenH - imgPad * 2;
      const scale = Math.min(availW / img.width, availH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = screenX + (screenW - drawW) / 2;
      const drawY = screenY + (screenH - drawH) / 2;

      ctx.save();
      drawRoundedRect(ctx, screenX, screenY, screenW, screenH, 16);
      ctx.clip();
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        throw new Error("No se pudo generar la captura");
      }

      const fileName = `pokedex-${trainerName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      if (
        typeof navigator !== "undefined" &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Mi Castemon UNRC",
        });
        setShareMsg("¡COMPARTIDO!");
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setShareMsg("CAPTURA DESCARGADA");
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error("Error al compartir:", err);
        setShareMsg("ERROR AL COMPARTIR");
      }
    } finally {
      setSharing(false);
      setTimeout(() => setShareMsg(""), 3000);
    }
  };

  return (
    <ProtectedRoute>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          gap: "0.6rem",
          boxSizing: "border-box",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {graficoUrl && (
            <img
              src={graficoUrl}
              alt="Castemon"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>

        <button
          type="button"
          onClick={handleShareInstagram}
          disabled={sharing || !graficoUrl}
          style={{
            width: "100%",
            backgroundColor: "#55efc4",
            color: "#05130b",
            border: "2px solid #1c1c1c",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "0.75rem",
            padding: "7px 10px",
            cursor: sharing || !graficoUrl ? "not-allowed" : "pointer",
            letterSpacing: "0.8px",
            boxShadow: "0 3px 0px #1b8a6b",
            flexShrink: 0,
          }}
        >
          {sharing
            ? "GENERANDO CAPTURA..."
            : shareMsg
            ? `[ ${shareMsg} ]`
            : "[ COMPARTIR ]"}
        </button>
      </div>
    </ProtectedRoute>
  );
}
