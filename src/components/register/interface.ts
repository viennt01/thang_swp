export interface RegisterForm {
  email: string;
  password: string;
  fullName: string;
  firstName: string;
  phoneNumber: string;
  lastName: string;
  address: string;
  birthDated: number;
}

export interface ConfirmEmailForm {
  email: string;
  otp: string;
}
