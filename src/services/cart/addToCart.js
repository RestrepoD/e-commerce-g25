import { axiosInstance } from "../../api/axiosInstance";

export async function addToCart({ token, quantity, productId }) {
  try {
    const body = { quantity, productId };
    await axiosInstance.post("cart/", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response) {
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    } else throw new Error("Something went wrong");
  }
}
