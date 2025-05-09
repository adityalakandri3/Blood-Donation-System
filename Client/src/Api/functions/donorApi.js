import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";

export const getAllrequestForDonor = async () => {
  try {
    const { data } = await axiosInstance.get(endPoints.donor.getAllrequest);
    return data;
  } catch (error) {
    console.error(
      "Get all blood requests error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllrequestForDonorById = async (id) => {
  try {
    const { data } = await axiosInstance.get(
      endPoints.donor.getAllRequestByID(id)
    );
    return data;
  } catch (error) {
    console.error(
      "Get all blood requests error:",
      error.response?.data || error.message
    );
    throw error;
  }
};




export const acceptBloodRequestByDonor = async (id) => {
  try {
    const { data } = await axiosInstance.post(endPoints.donor.acceptRequest(id));
    return data;
  } catch (error) {
    console.error("Error accepting blood request:", error.response?.data || error.message);
    throw error;
  }
};
