// Cambia esta variable para apuntar a otro entorno o dominio fácilmente
export const API_BASE_URL = "https://castemonesback.triforma.mx";
export const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;

/**
 * Verifica en el backend si el usuario ya tiene su perfil completo.
 * - HTTP 200: Perfil completo -> devuelve los datos del perfil y firstTime: false
 * - HTTP 403: Perfil incompleto -> devuelve firstTime: true para redirigir a /completar-perfil
 */
export async function login(user) {
  const token = await user.getIdToken();

  const response = await fetch(LOGIN_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "auth-token": token,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const raw = await response.json().catch(() => ({}));
    const profileData = raw?.data ?? raw;

    return {
      ...(typeof profileData === "object" && profileData !== null
        ? profileData
        : {}),
      profile: profileData,
      firstTime: false,
      status: 200,
    };
  }

  if (response.status === 403) {
    return {
      profile: null,
      firstTime: true,
      status: 403,
    };
  }

  const errorData = await response.json().catch(() => ({}));
  const error = new Error(
    errorData.error ||
      errorData.message ||
      `Error al verificar perfil (${response.status})`
  );
  error.status = response.status;
  throw error;
}

export async function registro(user, correo) {
  const dir = `${API_BASE_URL}/registro`;

  const response = await fetch(dir, {
    method: "GET",
    headers: {
      user: user,
      mail: correo,
      "Content-Type": "application/json",
    },
  });

  const raw = await response.json().catch(() => ({}));
  return raw;
}

export async function getUserData(user) {
  return login(user);
}

/**
 * Actualiza los datos del usuario en el servidor
 * @param {Object} user - Usuario de Firebase
 * @param {Object} userData - Datos a actualizar (nombre, carrera, etc.)
 * @returns {Promise<Object>} - Respuesta del API
 */
export async function updateUserData(user, userData) {
  try {
    const token = await user.getIdToken();

    const response = await fetch(`${API_BASE_URL}/updateData`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "auth-token": token,
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

