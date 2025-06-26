import axiosClient from "../utils/axiosClient.js";

export const fetchAllUser = async () => {
  const response = await axiosClient.get("/users");
  return response.data;
};
export const fetchUserById = async (id) => {
  try {
    console.log("inside fetchUserById");
    const response = await axiosClient.get(`/users/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
