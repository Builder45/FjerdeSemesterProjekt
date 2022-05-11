import axios from "axios";

export async function getProducts() {
  console.log("Getting products...");
  const response = await axios.get('http://localhost:5117/api/' + 'Products');
  return response;
}