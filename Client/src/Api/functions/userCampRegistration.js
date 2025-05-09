import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";

export const userRegistrationCamp = async (id) => {
  try {
    const { data } = await axiosInstance.post(
      endPoints.camps.userRegistration(id)
    );
    return data;
  } catch (error) {
    console.error(
      "Update registration status error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMyRegistrations = async () => {
  try {
    const { data } = await axiosInstance.get(endPoints.camps.myRegistrations);
    return data;
  } catch (error) {
    console.error(
      "Update registration status error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const cancelUserRegistration = async (id) => {
    try {
      const { data } = await axiosInstance.post(endPoints.camps.cancelRegistration(id));
      return data;
    } catch (error) {
      console.error("Update registration status error:", error.response?.data || error.message);
      throw error;
    }
  };