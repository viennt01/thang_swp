import { post } from '@/fetcherAxios';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';

export const LikeNewFeed = (data: any) => {
  return post<any, any>({
    data,
  })(API_NEW_FEEDS.LIKE_NEWS_FEED);
};

export const CommentNewFeed = (data: any) => {
  return post<any, any>({
    data,
  })(API_NEW_FEEDS.COMMENT_NEWS_FEED);
};

export const GetNewFeedForSale = (data: any) => {
  return post<any, any>({
    data: {
      userID: data,
      currentPage: 1,
      pageSize: 100,
      search: '',
    },
  })(API_NEW_FEEDS.GET_NEWS_FEED_SALE_BY_ID_USER);
};

export const GetNewFeedForSaleById = (data: any) => {
  return post<any, any>({
    data: {
      id: data,
    },
  })(API_NEW_FEEDS.GET_NEWS_FEED_FOR_SALE_BY_ID);
};

export const GetSold = (data: any) => {
  return post<any, any>({
    data: {
      userID: data,
      search: '',
      currentPage: 1,
      pageSize: 100,
    },
  })(API_NEW_FEEDS.GET_SOLD);
};

export const AcceptBuy = (data: any) => {
  return post<any, any>({
    data,
  })(API_NEW_FEEDS.ACCEPT_BUY);
};
export const ConfirmBuy = (data: any) => {
  return post<any, any>({
    data,
  })(API_NEW_FEEDS.CONFIRM_BUY);
};
