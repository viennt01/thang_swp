import { post } from '@/fetcherAxios';
import { API_NEW_FEEDS, API_REACTION } from '@/fetcherAxios/endpoint';

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
      search: data,
      currentPage: 1,
      pageSize: 100,
    },
  })(API_NEW_FEEDS.GET_NEWS_FEED_FOR_SALE);
};

export const GetNewFeedForSaleById = (data: any) => {
  return post<any, any>({
    data,
  })(API_NEW_FEEDS.GET_NEWS_FEED_FOR_SALE_BY_ID);
};

export const ReactionInterested = (data: any) => {
  return post<any, any>({
    data,
  })(API_REACTION.INTERESTED_NEWS_FEED);
};
