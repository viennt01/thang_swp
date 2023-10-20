import { post } from '@/fetcherAxios';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';

export const GetNewFeed = (data: any) => {
  return post<any, any>({
    data: {
      search: data,
      currentPage: 1,
      pageSize: 100,
    },
  })(API_NEW_FEEDS.GET_NEWS_FEED);
};

export const GetNewFeedById = (data: any) => {
  return post<any, any>({
    data: {
      id: data,
    },
  })(API_NEW_FEEDS.GET_NEWS_FEED_BY_ID);
};

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

export const GetNewFeedForSale = () => {
  return post({
    data: {
      currentPage: 1,
      pageSize: 100,
    },
  })(API_NEW_FEEDS.GET_NEWS_FEED_FOR_SALE);
};
