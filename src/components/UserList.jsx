// Componente solo para mostrar la tabla de usuarios y avisar al padre cuando hacen click
export function UserList({ users, onEdit, onDelete }) {
  // Si todavía no hay datos o la lista está vacía
  if (!users.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 shadow-sm">
        <p className="text-base font-medium">No se encontraron usuarios</p>
        <p className="text-xs text-slate-400 mt-1">
          Prueba agregando uno nuevo o modificando el filtro de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-xs font-semibold tracking-wider">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Teléfono</th>
            <th className="py-3 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-slate-50/80 transition-colors"
            >
              <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                #{user.id}
              </td>
              <td className="py-3.5 px-4 font-medium text-slate-900">
                {user.name}
              </td>
              <td className="py-3.5 px-4 text-slate-500">{user.email}</td>
              <td className="py-3.5 px-4 text-slate-500">
                {user.phone || "N/A"}
              </td>
              <td className="py-3.5 px-4 text-right space-x-1">
                <button
                  onClick={() => onEdit(user)}
                  className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
