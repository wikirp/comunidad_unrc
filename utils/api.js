const prod_api = "https://api-comunidada-unrc.wikirp.dev";
const dev_api = "http://localhost";

const api = dev_api;

export async function login(user) {
  // Obtener el token de Firebase

  return {
    firstTime: true,
  };
  const token = await user.getIdToken();

  const dir = api + "/api/login";

  const response = await fetch(dir, {
    method: "GET",
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
  });

  const raw = await response.json();

  console.log(raw.data);
}

export async function registro(user, correo) {
  // Obtener el token de Firebase

  return {
    firstTime: true,
  };
  const dir = api + "/registro";

  const response = await fetch(dir, {
    method: "GET",
    headers: {
      user: user,
      mail: correo,
      "Content-Type": "application/json",
    },
  });

  const raw = await response.json();

  console.log(raw.data);
}

export async function getUserData(user) {
  return {
    firstTime: true,
  };
  try {
    // Obtener el token de Firebase
    const token = await user.getIdToken();

    const dir = api + "/registro";
    // Hacer la consulta a la API route local (que actúa como proxy)
    const response = await fetch(dir, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `Error en la respuesta del servidor: ${response.status}`
      );
    }

    const raw = await response.json();

    return raw;
  } catch (error) {
    console.error("Error al consultar el API:", error);
    throw error;
  }
}

/**
 * Actualiza los datos del usuario en el servidor
 * @param {Object} user - Usuario de Firebase
 * @param {Object} userData - Datos a actualizar (nombre, carrera, etc.)
 * @returns {Promise<Object>} - Respuesta del API
 */
export async function updateUserData(user, userData) {
  try {
    // Obtener el token de Firebase
    const token = await user.getIdToken();

    // Hacer la consulta a la API route local (que actúa como proxy)
    const response = await fetch("/api/updateData", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `Error en la respuesta del servidor: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    throw error;
  }
}
