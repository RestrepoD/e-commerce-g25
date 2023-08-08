import { axiosInstance } from "../../api/axiosInstance";

export async function getAllProducts(categories, title) {
  try {
    const params = { title, categoryId: categories };
    const res = await axiosInstance.get("/products", { params });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
