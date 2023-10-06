export const ROUTERS = {
  LOGIN: '/',
  LOGOUT: '/logout',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/home',
  PROFILE: '/profile',
  FEE_FOR_SALE: '/fee-for-sale',
  FEE_FOR_SALE_DETAIL: (id: string) => `/detail-feed-for-sale/${id}`,
};
