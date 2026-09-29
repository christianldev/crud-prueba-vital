import { useState, useEffect, useCallback } from "react";
import { userService } from "../services/userService";

// Hook personalizado para manejar los datos y las acciones CRUD en un solo lugar
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Traer la lista inicial de usuarios.
  // Usamos useCallback para no recrear la función innecesariamente en cada render.
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los usuarios");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Llamamos a la API apenas se monta la pantalla
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Crear un nuevo usuario
  const createUser = async (newUserData) => {
    setIsLoading(true);
    setError(null);
    try {
      const createdUser = await userService.create(newUserData);
      // Si el backend ya generó un ID real (como json-server), lo conservamos
      const safeUser = createdUser?.id
        ? createdUser
        : { ...createdUser, id: Date.now() };
      setUsers((prev) => [safeUser, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message || "Error al crear el usuario");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar usuario existente
  const updateUser = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.update(id, updatedData);
      // Actualizamos el usuario directamente en la lista local para ver el cambio ya
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, ...updatedData, ...(updatedUser || {}) }
            : user,
        ),
      );
      return { success: true };
    } catch (err) {
      setError(err.message || "Error al actualizar el usuario");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await userService.delete(id);
      // Filtramos la lista para quitarlo de pantalla
      setUsers((prev) => prev.filter((user) => user.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message || "Error al eliminar el usuario");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Exportamos los datos y las funciones para usarlos en App.jsx
  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
