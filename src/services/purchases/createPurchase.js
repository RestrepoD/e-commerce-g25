import { axiosInstance } from "../../api/axiosInstance";

export async function createPurchase(token) {
  try {
    await axiosInstance.post("/purchases", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("Something went wrong with the purchase request");
  }
}
