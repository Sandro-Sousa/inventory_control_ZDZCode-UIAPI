export interface User {
    idUser: number;
    name: string;
    email: string;
    fone: string;
}

export interface UserAdd extends Omit<User, 'idUser'> {
    idUser: number;
  }