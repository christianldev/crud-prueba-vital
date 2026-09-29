import { apiClient } from "../api/client";

// Dejamos todas las peticiones de usuarios aquí para tener el código ordenado
// y no poner URLs sueltas en los componentes
export const userService = {
  // Traer todos los usuarios
  getAll: () => apiClient("/users"),

  // Buscar un usuario específico por su id
  getById: (id) => apiClient(`/users/${id}`),

  // Crear un usuario
  create: (userData) =>
    apiClient("/users", {
      body: userData,
      method: "POST",
    }),

  // Actualizar datos del usuario
  update: (id, userData) =>
    apiClient(`/users/${id}`, {
      body: userData,
      method: "PUT",
    }),

  // Borrar usuario
  delete: (id) =>
    apiClient(`/users/${id}`, {
      method: "DELETE",
    }),
};
