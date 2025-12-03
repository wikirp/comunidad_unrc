import { NextResponse } from "next/server";

const prod_api = "https://api-comunidada-unrc.wikirp.dev";
const dev_api = "http://localhost:8000";

export async function GET(request) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token de autorización requerido" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Hacer la consulta al API externo desde el servidor (sin problemas de CORS)
    const response = await fetch(dev_api + "/usuariounrc/getData", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Error del servidor: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en API route getData:", error);
    return NextResponse.json(
      { error: "Error al consultar el API", details: error.message },
      { status: 500 }
    );
  }
}
