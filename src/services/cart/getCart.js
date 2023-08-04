import { axiosInstance } from "../../api/axiosInstance";

export async function getCart(token) {
  try {
    const res = await axiosInstance.get("cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    else throw new Error("Something went wrond with the cart request");
  }
}
