import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = process.env.WEBSHOP_API_BASE_URL || 'http://localhost:5117/api/';

const ApiClient = () => {
  const defaultOptions = { baseURL };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 429) {
        document.location.href = '/server-fejl';
      }
    },
  );

  return instance;
};

export default ApiClient();