export const ERROR_MESSAGES = {
  USER: {
    ID_REQUIRED: { message: "ID de usuario es requerido", success: false },
    EMAIL_REQUIRED: { message: "Email es requerido", success: false },
    CREDENTIALS_REQUIRED: {
      message: "Email, contraseña y nombre de usuario son requeridos",
      success: false,
    },
    EMAIL_REGISTERED: {
      message: "El email ya está registrado",
      success: false,
    },
    NOT_FOUND: { message: "Usuario no encontrado", success: false },
    INVALID_PASSWORD: { message: "Contraseña incorrecta", success: false },
    PASSWORDS_DONT_MATCH: {
      message: "Las contraseñas no coinciden",
      success: false,
    },
  },
  AUTH: {
    ROLE: {
      FORBIDDEN: {
        message: "Acceso denegado, se requieren privilegios de administrador",
        success: false,
      },
      MISSING: { message: "Rol faltante", success: false },
    },
    PERMISSIONS: {},
    UNAUTHORIZED: { message: "No autorizado", success: false },
    INCORRECT_CREDENTIALS: {
      message: "Credenciales incorrectas",
      success: false,
    },
    TOKEN_EXPIRED: { message: "Token expirado", success: false },
    INVALID_TOKEN: { message: "Token inválido", success: false },
    NO_TOKEN: { message: "No se proporcionó token", success: false },
  },
  EQUIPMENT: {
    ID_REQUIRED: { message: "ID de equipo es requerido", success: false },
    NAME_REQUIRED: {
      message: "Nombre del equipo es requerido",
      success: false,
    },
    REQUIRED_FIELDS: {
      message: "Nombre, tipo y número de serie son campos requeridos",
      success: false,
    },
    NOT_FOUND: { message: "Equipo no encontrado", success: false },
    IN_USE: {
      message: "El equipo está en uso y no puede ser eliminado",
      success: false,
    },
    INVALID_STATUS: { message: "Estado de equipo inválido", success: false },
    INVALID_TYPE: { message: "Tipo de equipo inválido", success: false },
    INVALID_LOCATION: {
      message: "Ubicación de equipo inválida",
      success: false,
    },
    INVALID_SERIAL_NUMBER: {
      message: "Número de serie inválido",
      success: false,
    },
    TYPE_REQUIRED: { message: "Tipo de equipo es requerido", success: false },
    ALREADY_ASSIGNED: {
      message: "El equipo ya está asignado a un usuario",
      success: false,
    },
    ONLY_ASSIGNED_TO_SELF: {
      message: "Solo puedes gestionar tu propio equipo",
      success: false,
    },

    NOT_ASSIGNED: {
      message: "El equipo no está asignado a ningún usuario",
      success: false,
    },
    NO_EQUIPMENTS_FOUND: {
      message: "No se encontraron equipos",
      success: false,
    },
    NO_EQUIPMENTS_OF_TYPE: {
      message: "No se encontraron equipos de este tipo",
      success: false,
    },
    SERIAL_NUMBER_ALREADY_EXISTS: {
      message: "El número de serie ya existe",
      success: false,
    },
  },
};
