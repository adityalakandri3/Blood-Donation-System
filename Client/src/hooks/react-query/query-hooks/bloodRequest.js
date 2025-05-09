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
        navigate("/bloodrequestlist");
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

export const useUpdateBloodRequestMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: ({ id, input }) => updateBloodRequest(id, input),
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message || "Blood request updated successfully");
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
        navigate("/blood-request-updated");
      } else {
        toast.error(message || "Failed to update blood request");
      }
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(`Update request failed: ${errMsg}`);
      console.error("Update request failed:", errMsg);
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

// Fetch a single blood request by ID
export const useGetBloodRequestByIdQuery = (id) => {
  return useQuery({
    queryKey: [BLOOD_REQUESTS, id],
    queryFn: () => getBloodRequestById(id),
    enabled: !!id,
  });
};
