# 📋 Gestión de Usuarios - CRUD en React

Aplicación web interactiva desarrollada con **React**, **Vite** y **Tailwind CSS** para la gestión de usuarios (Crear, Leer, Actualizar y Eliminar). Diseñada siguiendo buenas prácticas de arquitectura de software, patrones de diseño modulares y una experiencia de usuario (UX) pulida.

---

## 🚀 Características Implementadas

- **Operaciones CRUD Completas:**
  - **Crear (Create):** Formulario controlado con validaciones en cliente y prevención de envíos dobles.
  - **Leer (Read):** Consumo asíncrono desde API REST con indicadores de carga y mensajes de error.
  - **Actualizar (Update):** Reutilización del formulario en modo edición y actualización optimista de los datos.
  - **Eliminar (Delete):** Modal de confirmación accesible y estilizado que previene eliminaciones accidentales.
- **Búsqueda y Filtrado en Tiempo Real:** Filtro reactivo por nombre utilizando estado derivado y optimización con `useMemo`.
- **Paginación en Cliente:** Navegación en bloques de 5 usuarios por página, con autoajuste si el resultado filtrado cambia.
- **Feedback de Carga (Loading State):** Botones bloqueados y spinners dinámicos para operaciones en progreso.
- **Diseño Responsivo:** Creado con **Tailwind CSS**, adaptado tanto para pantallas de escritorio como móviles.

---

## 🏗️ Arquitectura y Patrones de Diseño

El proyecto se organizó bajo el principio de **Separación de Responsabilidades (Separation of Concerns)**:

```text
src/
├── api/
│   └── client.js             # Cliente HTTP centralizado (fetch wrapper)
├── services/
│   └── userService.js        # Service / Repository Pattern (llamadas a la entidad)
├── hooks/
│   └── useUsers.js           # Custom Hook (Lógica de negocio y estado del CRUD)
├── components/
│   ├── UserForm.jsx          # Formulario controlado (Creación y Edición)
│   ├── UserList.jsx          # Tabla presentacional de usuarios
│   └── ConfirmModal.jsx      # Modal de confirmación para acciones destructivas
└── App.jsx                   # Orquestador y composición de componentes
```

### Decisiones Técnicas Destacadas:
1. **Capa de Red Abstraída (`client.js`):** Centraliza headers, parseo de JSON y control de respuestas no exitosas de `fetch`. Si mañana se cambia a `axios`, la interfaz se mantiene intacta.
2. **Patrón de Servicio / Repositorio (`userService.js`):** Los componentes y hooks nunca conocen URLs hardcodeadas ni métodos HTTP directos.
3. **Custom Hook (`useUsers.js`):** Encapsula el ciclo de vida, estados de carga (`isLoading`), captura de errores (`error`) y sincronización de datos, dejando la UI limpia.
4. **Estado Derivado para Filtros y Paginación:** No se crearon estados redundantes para la lista filtrada ni paginada, evitando bugs de desincronización y aprovechando `useMemo`.

---

## 🛠️ Tecnologías Utilizadas

- **React 18 / 19** (Hooks: `useState`, `useEffect`, `useCallback`, `useMemo`)
- **Vite** (Build tool y servidor de desarrollo rápido)
- **Tailwind CSS** (Estilos modernos con utilidades)
- **JSON Server / JSONPlaceholder** (Backend REST simulado)

---

## ⚙️ Instalación y Puesta en Marcha

### 1. Clonar o ingresar a la carpeta del proyecto
```bash
cd d:/crud-react-prueba
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Levantar la API mock (si usas json-server)
Si cuentas con un archivo `db.json` configurado:
```bash
npx json-server --watch db.json --port 3001
```
*(Verifica que la URL en `src/api/client.js` apunte al puerto correcto, ej: `http://localhost:3001` o a JSONPlaceholder).*

### 4. Iniciar el entorno de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173`.

---

## 💡 Puntos Clave para la Prueba Técnica

Si te preguntan por qué se tomaron ciertas decisiones:
- **¿Por qué un Custom Hook?** Porque desacopla completamente la lógica de negocio de la capa de presentación (UI). Esto permite testear la lógica de usuarios de forma aislada.
- **¿Por qué no guardar `filteredUsers` en un `useState`?** En React se considera un anti-patrón duplicar datos que pueden derivarse de un estado base (`users` + `searchTerm`). Calcularlo al vuelo evita inconsistencias.
- **¿Por qué `useCallback` en `fetchUsers`?** Para asegurar la estabilidad de la función como dependencia en `useEffect` sin generar bucles infinitos de re-renderizado.
```

<!--
[PROMPT_SUGGESTION]¿Qué preguntas técnicas teóricas de React suelen hacer sobre este tipo de proyectos en entrevistas?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]¿Cómo agregar tests unitarios básicos para el hook useUsers usando Vitest?[/PROMPT_SUGGESTION]
