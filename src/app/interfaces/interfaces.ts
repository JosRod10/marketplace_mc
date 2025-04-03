export interface Interfaces {
}

export interface Usuario {
    displayName: string | null; // Puede ser null si no está definido
    email: string | null; // Puede ser null si no está definido
    lastSignInTime: string; // La fecha generalmente es un string
    accessToken: string; // Token de acceso
    uid: string; // ID del usuario
    tipoUsuario: string; // Tipo de usuario (cliente o proveedor)
    nomNegocio: string; // Nombre del negocio
    contrasena: string;
  }
