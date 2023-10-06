import { post, ResponseWithPayload } from '@/fetcherAxios';
import { ConfirmEmailForm, RegisterForm } from './interface';
import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';

export const register = (data: RegisterForm) => {
  return post<RegisterForm, ResponseWithPayload>({
    data,
  })(API_AUTHENTICATE.REGISTER);
};

export const confirmEmail = (data: ConfirmEmailForm) => {
  return post<ConfirmEmailForm, ResponseWithPayload>({
    data,
  })(API_AUTHENTICATE.CONFIRM_OTP);
};
