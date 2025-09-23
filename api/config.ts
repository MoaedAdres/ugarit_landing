export const online = false;

export const BASE_URL = online ? process.env.NEXT_PUBLIC_ONLINE_BASE_URL : process.env.NEXT_PUBLIC_LOCAL_BASE_URL;
