declare namespace Express {
  export interface Request {
    user: Usuario;
  }
}

interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  password: string;
  avatar: string;
}