import { get, post } from '@/fetcherAxios';
import { API_MASTER_DATA, API_NEW_FEEDS } from '@/fetcherAxios/endpoint';

export const getTypeGoods = () => {
  return get<any>({})(API_MASTER_DATA.GET_TYPE_GOODS);
};

export const getTypeNewsFeed = () => {
  return get<any>({})(API_MASTER_DATA.GET_TYPE_NEWS_FEED);
};

export const CreateNewFeed = (data: any) => {
  return post({ data })(API_NEW_FEEDS.CREATE_NEWS_FEED);
};
export const CreateNewFeedForSale = (data: any) => {
  return post({ data })(API_NEW_FEEDS.CREATE_NEWS_FEED_FOR_SALE);
};
