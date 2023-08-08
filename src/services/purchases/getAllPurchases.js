import { axiosInstance } from "../../api/axiosInstance";

export async function getAllPurchases(token) {
  try {
    const res = await axiosInstance.get("/purchases", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    else throw new Error("Something went wrong with the purchase request");
  }
}
