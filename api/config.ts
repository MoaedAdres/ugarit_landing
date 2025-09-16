const online = true;

export const BASE_URL = online
  ? process.env.ONLINE_BASE_URL
  : process.env.LOCAL_BASE_URL;
