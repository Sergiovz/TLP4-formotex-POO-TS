# Actividad Práctica: Desarrollo con TypeScript

## Objetivo

Desarrollar una aplicación backend para la gestión del inventario de equipos informáticos de una empresa, utilizando **TypeScript**, una base de datos a elección (**mysql**, **pg** o **mongodb**), autenticación con **JSON Web Token (JWT)**, **validaciones** y aplicando buenas prácticas de **modularización**.

---

## Contexto

La empresa **FORMOTEX** se dedica al mantenimiento y distribución de equipos informáticos. Actualmente, la gestión manual del inventario provoca errores como información desactualizada, falta de control de ubicación y dificultad para asignar responsables a los equipos.

La nueva aplicación debe ofrecer un **control centralizado, seguro y validado** del inventario. Cada desarrollador definirá funcionalidades, propiedades y relaciones adicionales que considere necesarias para un manejo eficiente.

---

## Requerimientos

### 1. Funcionalidades CRUD

- La aplicación debe permitir las operaciones básicas (**Crear, Leer, Actualizar, Eliminar**) para la gestión de equipos informáticos.
- Solo los **usuarios autenticados** podrán acceder a los endpoints protegidos.
- Cada equipo debe estar asignado a un **responsable** (un usuario de la empresa).
- Las entidades deben ser detalladas; los equipos deben tener propiedades más allá de solo un nombre y responsable.

### 2. Autenticación con JWT

- Implementar un sistema de autenticación utilizando **JSON Web Token (JWT)**.
- Los usuarios deben poder iniciar sesión a través de un endpoint de autenticación.
- Al autenticarse, el backend debe generar un **token firmado** para acceder a los endpoints protegidos.
- Definir al menos dos **roles de usuario**:
  - **admin**: Acceso total a la aplicación (gestión de usuarios, equipos, etc.).
  - **user**: Acceso limitado para gestionar únicamente los equipos a su cargo.
- Los endpoints deben requerir un **token válido** y, cuando sea necesario, un **rol de usuario específico**.

### 3. Endpoints

- **`POST /api/auth/login`**: Para la autenticación de usuarios.
- **`POST /api/auth/register`**: Para el registro de nuevos usuarios (restringido a administradores).
- Todos los demás endpoints deben usar el prefijo **`/api/...`**.
- El resto de los endpoints deben ser diseñados y documentados por el desarrollador.

### 4. Backend con TypeScript

- El proyecto debe usar **Node.js + Express + TypeScript** con **tipado estricto**.
- La lógica de negocio debe estar en una capa de **servicios**, y los **controladores** solo deben manejar las solicitudes y respuestas (request/response).
- Utilizar **helpers** y **middlewares** para tareas comunes como el manejo de tokens o validaciones.

### 5. Validaciones y Control de Acceso

- Todos los endpoints deben tener **validaciones de datos**.
- Implementar un sistema de **permisos** basado en los roles definidos.
- Asegurar la **unicidad** en las entidades principales (ej: no permitir registrar dos usuarios con el mismo email).
- El desarrollador debe justificar cómo se organizaron las validaciones y el manejo de errores y respuestas HTTP.

### 6. Documentación Requerida

Crear un archivo **`README.md`** que incluya:

- **Instrucciones para ejecutar el proyecto**: dependencias, comandos, configuración de variables de entorno, etc.
- **Justificación técnica**: Explicación de las decisiones sobre:
  - Diseño de relaciones entre entidades.
  - Organización de carpetas.
  - Propiedades elegidas para cada entidad.
  - Elección de librerías o patrones de arquitectura.

---

## Criterios de Evaluación

1.  **JWT y Roles**: Correcta implementación de la autenticación y el sistema de roles.
2.  **Modularización**: Separación adecuada de controladores, servicios, helpers, etc.
3.  **TypeScript**: Uso de tipado estricto en todo el proyecto.
4.  **Validaciones**: Implementación de validaciones de unicidad y consistencia.
5.  **CRUD**: Funcionalidades CRUD de equipos protegidas por autenticación.
6.  **Relaciones**: Relación entre usuario y equipos implementada correctamente.
7.  **Reutilización**: Uso de helpers y middlewares reutilizables.
8.  **Manejo de Errores**: Manejo correcto de errores y códigos de respuesta HTTP.
9.  **Justificación**: Claridad en la justificación de las decisiones técnicas.
