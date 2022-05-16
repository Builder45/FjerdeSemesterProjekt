import axios from "axios";

const ApiUrl = 'http://localhost:5117/api/';

export const getProducts = async () => await axios.get(ApiUrl + 'Products');
export const getProduct = async (id) => await axios.get(ApiUrl + 'Products/' + id);

export const getProductsByQuery = async (params) => {
  let apiRoute = ApiUrl + 'Products?';

  if (params.search) {
    const encodedParams = encodeURIComponent(params.search);
    apiRoute += `search=${encodedParams}&`;
  }
  console.log(apiRoute);
  return await axios.get(apiRoute);
};

export const updateProductReview = async (review, productId, token) => {
  return await axios.put(ApiUrl + 'Products/' + productId + '/Reviews', 
    {
      ...review
    },
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
}