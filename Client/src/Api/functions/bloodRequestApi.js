import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";


export const createBloodRequest = async (input) => {
  try {
    const { data } = await axiosInstance.post(endPoints.blood_requests.create, input);
    return data;
  } catch (error) {
    console.error("Create blood request error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllBloodRequests = async () => {
  try {
    const { data } = await axiosInstance.get(endPoints.blood_requests.getAll);
    return data;
  } catch (error) {
    console.error("Get all blood requests error:", error.response?.data || error.message);
    throw error;
  }
};

export const getBloodRequestById = async (id) => {
  try {
    const { data } = await axiosInstance.get(endPoints.blood_requests.getById(id));
    return data;
  } catch (error) {
    console.error("Get blood request by ID error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateBloodRequest = async (id, input) => {
  try {
    const { data } = await axiosInstance.put(endPoints.blood_requests.update(id), input);
    return data;
  } catch (error) {
    console.error("Update blood request error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBloodRequest = async (id) => {
  try {
    const { data } = await axiosInstance.delete(endPoints.blood_requests.delete(id));
    return data;
  } catch (error) {
    console.error("Delete blood request error:", error.response?.data || error.message);
    throw error;
  }
};
