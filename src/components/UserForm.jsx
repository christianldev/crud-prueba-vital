import { useState, useEffect } from "react";

// Valores por defecto para limpiar o arrancar el formulario
const INITIAL_STATE = { name: "", email: "", phone: "" };

// Formulario que sirve tanto para crear como para editar
export function UserForm({ onSubmit, userToEdit, onCancel }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [validationError, setValidationError] = useState("");

  // Si seleccionamos a alguien para editar, cargamos sus datos; si cancelamos, limpiamos los inputs
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || "",
        email: userToEdit.email || "",
        phone: userToEdit.phone || "",
      });
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [userToEdit]);

  // Manejador común para actualizar cualquier input según su atributo 'name'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación sencilla para no mandar campos vacíos
    if (!formData.name.trim() || !formData.email.trim()) {
      setValidationError("Nombre y correo son obligatorios.");
      return;
    }

    setValidationError("");
    onSubmit(formData);
    setFormData(INITIAL_STATE);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 transition-all"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-slate-800">
          {userToEdit ? "✏️ Editar Usuario" : "➕ Crear Nuevo Usuario"}
        </h3>
        {userToEdit && (
          <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2.5 py-0.5 rounded-full">
            Modo edición
          </span>
        )}
      </div>

      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {validationError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ej. Juan Pérez"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            placeholder="juan@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Teléfono
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Ej. +54 9 11 1234-5678"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {userToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition shadow-sm ${
            userToEdit
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {userToEdit ? "Guardar Cambios" : "Registrar"}
        </button>
      </div>
    </form>
  );
}
