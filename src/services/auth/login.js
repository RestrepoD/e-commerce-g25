import { axiosInstance } from "../../api/axiosInstance";

export async function login({ email, password }) {
  try {
    const res = await axiosInstance.post("users/login", { email, password });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
