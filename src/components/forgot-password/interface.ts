export interface ResetPasswordForm {
  email: string;
}

export interface ConfirmEmailForm {
  email: string;
  password: string;
  otp: string;
}
