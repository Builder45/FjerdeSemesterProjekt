import axios from "axios";
import api from "./api-client";

/* 
  Auth
*/
export const emailExists = async (email) => await api.get('Auth/EmailExists/' + email);

export const createUser = async (user) => await api.post('Auth/Signup', { ...user });

/* 
  Users
*/
export const getUserProfile = async (token) => await api.get('Users/GetProfile', { 
  headers: { 'Authorization': `Bearer ${token}` }
});

export const updateUserInfo = async (userInfo) => await api.put('Users/UpdateInformation', {
  ...userInfo
});

export const updateUserPassword = async (password) => await api.put('Users/UpdatePassword', {
  password
});

export const createUserAddress = async (address) => await api.post('Users/Addresses', {
  ...address
});

export const removeUserAddress = async (title) => await api.delete('Users/Addresses/' + title);

/* 
  Products
*/
export const getProducts = async () => await api.get('Products');

export const getProduct = async (id) => await api.get('Products/' + id);

export const getProductsByQuery = async (params) => {
  let apiRoute = 'Products?';

  if (params.search) {
    const encodedParams = encodeURIComponent(params.search);
    apiRoute += `search=${encodedParams}&`;
  }
  
  return await api.get(apiRoute);
};

/* 
  Reviews
*/
export const updateProductReview = async (review, productId) => {
  return await api.put('Products/' + productId + '/Reviews', 
    { ...review }
  );
};


/* 
  Eksterne API-kald
*/
export const getCityByPostalCode = async (postalCode) => {
  try {
    const response = await axios.get('https://api.dataforsyningen.dk/postnumre/?nr=' + postalCode);
    return response.data[0] ? response.data[0].navn : "";
  }
  catch (error) {
    console.log(error);
    return "";
  }
};
