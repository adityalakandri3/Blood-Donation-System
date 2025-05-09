import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { BLOOD_REQUESTS } from "../query-keys/QueryKeys";
import {
  createBloodRequest,
  deleteBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  updateBloodRequest,
} from "../../../Api/functions/bloodRequestApi";
import { toast } from "react-toastify";

export const useCreateBloodRequestMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: createBloodRequest,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message || "Blood request created successfully");
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
        navigate("/blood-request-list");
      } else {
        toast.error(message || "Failed to create blood request");
      }
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(`Create request failed: ${errMsg}`);
      console.error("Create request failed:", errMsg);
    },
  });
};

// Fetch a single blood request by ID
export const  useGetBloodRequestById= (id) => {
  return useQuery({
    queryKey: [BLOOD_REQUESTS, id],
    queryFn: () => getBloodRequestById(id),
  });
};
export const useUpdateBloodRequest = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: ({ id, data }) => updateBloodRequest(id, data),
    onSuccess: (response) => {
      const { status, message } = response || {};

      if (status === true) {
        toast.success(message || "Blood Request updated successfully");
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
        navigate("/blood-request-list");
      } else {
        toast.error(message || "Blood Request update failed");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Something went wrong during update"
      );
    },
  });
};

export const useDeleteBloodRequestMutation = () => {
  const { queryClient } = useGlobalHooks();

  return useMutation({
    mutationFn: deleteBloodRequest,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message || "Blood request deleted successfully");
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
      } else {
        toast.error(message || "Failed to delete blood request");
      }
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(`Delete request failed: ${errMsg}`);
      console.error("Delete request failed:", errMsg);
    },
  });
};

// Fetch all blood requests
export const useGetAllBloodRequestsQuery = () => {
  return useQuery({
    queryKey: [BLOOD_REQUESTS],
    queryFn: getAllBloodRequests,
  });
};

