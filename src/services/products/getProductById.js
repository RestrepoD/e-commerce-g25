import { axiosInstance } from "../../api/axiosInstance";

export async function getProductById(productId) {
  try {
    const res = await axiosInstance.get(`products/${productId}`);

    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    else throw new Error("Something went wrong with the product request");
  }
}
