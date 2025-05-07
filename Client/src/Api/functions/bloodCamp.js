import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";


// Create a new camp (Admin only)
export const createCamp = async (input) => {
  try {
    const { data } = await axiosInstance.post(endPoints.camps.create,input);
    return data;
  } catch (error) {
    console.error("Create camp error:", error.response?.data || error.message);
    throw error;
  }
};

// Get all camps (Auth required)
export const getAllCamps = async () => {
  try {
    const { data } = await axiosInstance.get(endPoints.camps.getAll);
    return data;
  } catch (error) {
    console.error("Get all camps error:", error.response?.data || error.message);
    throw error;
  }
};

// Get camp by ID (Auth required)
export const getCampById = async (id) => {
  try {
    const { data } = await axiosInstance.get(endPoints.camps.getById(id));
    return data;
  } catch (error) {
    console.error("Get camp by ID error:", error.response?.data || error.message);
    throw error;
  }
};

// Update camp (Admin only)
export const updateCamp = async (id, input) => {
  try {
    const { data } = await axiosInstance.post(endPoints.camps.update(id), input);
    return data;
  } catch (error) {
    console.error("Update camp error:", error.response?.data || error.message);
    throw error;
  }
};

// Delete camp (Admin only)
export const deleteCamp = async (id) => {
  try {
    const { data } = await axiosInstance.get(endPoints.camps.delete(id));
    return data;
  } catch (error) {
    console.error("Delete camp error:", error.response?.data || error.message);
    throw error;
  }
};

// Get all registrations for a specific camp (Admin only)
export const getCampRegistrations = async (id) => {
  try {
    const { data } = await axiosInstance.get(endPoints.camps.getRegistrations(id));
    return data;
  } catch (error) {
    console.error("Get camp registrations error:", error.response?.data || error.message);
    throw error;
  }
};

// Get registrations by user and camp (Admin only)
export const getRegistrationsByUserAndCamp = async (userId, campId) => {
  try {
    const { data } = await axiosInstance.get(endPoints.camps.getRegistrationsByUserAndCamp(userId, campId));
    return data;
  } catch (error) {
    console.error("Get user/camp registration error:", error.response?.data || error.message);
    throw error;
  }
};

// Update registration status (Admin only)
export const updateRegistrationStatus = async (userId, campId, input) => {
  try {
    const { data } = await axiosInstance.post(endPoints.camps.updateRegistrationStatus(userId, campId), input);
    return data;
  } catch (error) {
    console.error("Update registration status error:", error.response?.data || error.message);
    throw error;
  }
};
