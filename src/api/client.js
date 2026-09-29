// URL base de la API pública para pruebas
const BASE_URL = "https://jsonplaceholder.typicode.com";

// Función auxiliar para no repetir la configuración de fetch en cada llamada
export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // Hacemos la petición
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // Fetch no tira error con respuestas 404 o 500, así que lo validamos manualmente
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Error HTTP: ${response.status}`);
  }

  return response.json();
}
