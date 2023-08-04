import { axiosInstance } from "../../api/axiosInstance";

export async function getAllCategories() {
  try {
    const res = await axiosInstance.get("categories");

    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    else throw new Error("Something went wrong with the category request");
  }
}
