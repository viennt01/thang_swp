export const API_MASTER_DATA = {
  GET_TYPE_GOODS: 'api/MasterData/get-all-type-goods',
  GET_TYPE_NEWS_FEED: 'api/MasterData/get-all-type-news-feed',
};
export const API_AUTHENTICATE = {
  SEND_OTP: 'api/Auth/reset-password',
  CONFIRM_OTP: 'api/Auth/confrim-account',
  RESET_PASSWORD: 'api/Auth/confrim-new-password',
  REGISTER: 'api/Auth/register',
  LOGIN: 'api/Auth/login',
  ACTIVE_ACCOUNT: 'api/active-account',
};
export const API_NEW_FEEDS = {
  CREATE_NEWS_FEED: 'create-news-feed',
  CREATE_NEWS_FEED_FOR_SALE: 'create-news-feed-for-sale',
  GET_NEWS_FEED: 'get-news-feed',
  GET_NEWS_FEED_BY_ID_USER: 'get-news-feed-by-user-id',
  GET_NEWS_FEED_SALE_BY_ID_USER: 'get-news-feed-for-sale-by-user-id',
  GET_NEWS_FEED_BY_ID: 'get-news-feed-by-id',
  GET_NEWS_FEED_FOR_SALE: 'get-news-feed-for-sale',
  GET_NEWS_FEED_FOR_SALE_BY_ID: 'get-news-feed-for-sale-by-id',
  LIKE_NEWS_FEED: 'like-news-feed',
  COMMENT_NEWS_FEED: 'comment-news-feed',
  UPDATE_NEW_FEED: 'update-new-feed',
  UPDATE_NEW_FEED_FOR_SALE: 'update-news-feed-for-sales',
  ACCEPT_BUY: 'confirm-user-accept-seen-numberphone-for-news-feed-for-sales',
  CONFIRM_BUY: 'confirm-user-for-news-feed-for-sales',
};
export const API_REACTION = {
  INTERESTED_NEWS_FEED: 'Interested-news-feed',
};
