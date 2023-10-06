import { ResponseWithPayload, post } from '@/fetcherAxios';
import { LoginForm } from './interface';
import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';

export const login = (data: LoginForm) => {
  console.log(1);

  return post<LoginForm, ResponseWithPayload>({
    data,
  })(API_AUTHENTICATE.LOGIN);
};
