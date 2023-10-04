import { post, ResponseWithPayload } from '@/fetcherAxios';
import { ConfirmEmailForm, ResetPasswordForm } from './interface';
import { API_AUTHENTICATE } from '@/fetcher/endpoint';

export const ResetPassword = (data: ResetPasswordForm) => {
  return post<ResetPasswordForm, ResponseWithPayload>({
    data,
  })(API_AUTHENTICATE.SEND_OTP);
};

export const confirmEmail = (data: ConfirmEmailForm) => {
  return post<ConfirmEmailForm, ResponseWithPayload>({
    data,
  })(API_AUTHENTICATE.RESET_PASSWORD);
};
