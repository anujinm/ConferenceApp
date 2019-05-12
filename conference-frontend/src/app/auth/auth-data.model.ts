//class of variables for registering
export class AuthRegisterModel {
  email: string;
  password: string;
  level: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
  profilePic: string;
  schoolDistrict: string;
  roleAtDistrict: string;
  social1: string;
  social2: string;
  social3: string;
  eventId: number;
}

//class of variables for registering
export class AuthLoginModel {
  email: string;
  password: string;
}

//class of variables for registering
export class AuthTokenModel {
  token: string;
  expiresIn: number;
  userId: number;
  level: number;
}
