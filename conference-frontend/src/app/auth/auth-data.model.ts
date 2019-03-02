export class AuthRegisterModel {
  email: string;
  password: string;
}

export class AuthLoginModel {
  email: string;
  password: string;
}

export class AuthTokenModel {
  token: string;
  expiresIn: number;
  userId: number;
}
