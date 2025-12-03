import { NextResponse } from "next/server";

export async function POST(request) {
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
    
    // Obtener el body de la petición
    const body = await request.json();

    // Hacer la consulta al API externo desde el servidor (sin problemas de CORS)
    const response = await fetch("https://api-comunidada-unrc.wikirp.dev/updateData", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
    console.error("Error en API route updateData:", error);
    return NextResponse.json(
      { error: "Error al actualizar los datos", details: error.message },
      { status: 500 }
    );
  }
}

