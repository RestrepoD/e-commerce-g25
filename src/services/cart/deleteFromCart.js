import { axiosInstance } from "../../api/axiosInstance";

export async function deleteFromCart(cartProductId, token) {
  try {
    await axiosInstance.delete(`cart/${cartProductId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("Something went wrong with the delete request");
  }
}
