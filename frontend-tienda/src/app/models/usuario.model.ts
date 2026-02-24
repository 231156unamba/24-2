export interface Usuario {
  idUsuario?: number;
  username: string;
  password?: string;
  rol: 'ADMIN' | 'USER';
}
