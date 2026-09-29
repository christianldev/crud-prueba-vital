import { useState, useMemo, useEffect } from "react";
import { useUsers } from "./hooks/useUsers";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";

const USERS_PER_PAGE = 5;

export default function App() {
  // Traemos los datos y funciones desde el custom hook
  const { users, isLoading, error, createUser, updateUser, deleteUser } =
    useUsers();
  // Guarda el usuario que estamos editando; si es null, estamos creando uno nuevo
  const [selectedUser, setSelectedUser] = useState(null);
  // Texto para filtrar usuarios por nombre
  const [searchTerm, setSearchTerm] = useState("");
  // Página en la que estamos parados
  const [currentPage, setCurrentPage] = useState(1);

  // Guardar datos: si tenemos a alguien seleccionado editamos, si no lo creamos
  const handleFormSubmit = async (formData) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, formData);
      setSelectedUser(null);
    } else {
      await createUser(formData);
    }
  };

  // Al dar click en 'Editar' en la tabla
  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  // Botón cancelar del formulario
  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  // Confirmamos antes de borrar para que no se presione por error
  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await deleteUser(id);
      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
    }
  };

  // Filtramos la lista según lo que escriba el usuario.
  // Usamos useMemo para que no filtre de nuevo si el componente se renderiza por otra razón.
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return users;
    return users.filter((user) => user.name.toLowerCase().includes(term));
  }, [users, searchTerm]);

  // Calculamos cuántas páginas hay en total
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );

  // Cortamos solo los 5 usuarios que tocan en la página actual
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Si al filtrar o borrar registros la página actual queda fuera de rango,
  // volvemos a la última página disponible
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <main className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            CRUD responsivo consumiendo API externa con paginación y búsqueda
          </p>
        </div>

        {/* Alertas de Error y Loading */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
            <span>⚠️ {error}</span>
          </div>
        )}

        {isLoading && (
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium animate-pulse">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Sincronizando con el servidor...
          </div>
        )}

        <UserForm
          onSubmit={handleFormSubmit}
          userToEdit={selectedUser}
          onCancel={handleCancelEdit}
        />

        {/* Barra de herramientas / Búsqueda */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Al buscar, volvemos siempre a la página 1
              }}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <span className="text-xs font-medium text-slate-500 self-end sm:self-center">
            Total: {filteredUsers.length} usuario
            {filteredUsers.length !== 1 ? "s" : ""}
          </span>
        </div>

        <UserList
          users={paginatedUsers}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {/* Botones de paginación */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 mt-6 pt-4 text-sm">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 bg-white font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              ← Anterior
            </button>
            <span className="text-xs text-slate-500 font-medium">
              Página <strong className="text-slate-800">{currentPage}</strong>{" "}
              de <strong className="text-slate-800">{totalPages}</strong>
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 bg-white font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
