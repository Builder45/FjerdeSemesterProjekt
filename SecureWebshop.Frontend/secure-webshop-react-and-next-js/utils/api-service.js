import axios from "axios";

const ApiUrl = 'http://localhost:5117/api/';

export const getProducts = async () => await axios.get(ApiUrl + 'Products');
export const getProduct = async (id) => await axios.get(ApiUrl + 'Products/' + id);