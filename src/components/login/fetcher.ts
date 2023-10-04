import { ResponseWithPayload, post } from '@/fetcherAxios';
import { LoginForm } from './interface';
import { API_AUTHENTICATE } from '@/fetcher/endpoint';

export const login = (data: LoginForm) => {
  return post<LoginForm, ResponseWithPayload>({
    data,
  })(API_AUTHENTICATE.LOGIN);
};
