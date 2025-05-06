import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { BLOOD_REQUESTS } from "../query-keys/QueryKeys";
import { createBloodRequest, deleteBloodRequest, getAllBloodRequests, getBloodRequestById, updateBloodRequest } from "../../../Api/functions/bloodRequestApi";

export const useCreateBloodRequestMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: createBloodRequest,
    onSuccess: (response) => {
      const { status } = response || {};
      if (status === true) {
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
        navigate("/bloodrequestlist");
      }
    },
    onError: (error) => {
      console.error("Create request failed:", error.response?.data?.message || error.message);
    },
  });
};

export const useUpdateBloodRequestMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: ({ id, input }) => updateBloodRequest(id, input),
    onSuccess: (response) => {
      const { status } = response || {};
      if (status === true) {
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
        navigate("/blood-request-updated");
      }
    },
    onError: (error) => {
      console.error("Update request failed:", error.response?.data?.message || error.message);
    },
  });
};

export const useDeleteBloodRequestMutation = () => {
  const { queryClient } = useGlobalHooks();

  return useMutation({
    mutationFn: deleteBloodRequest,
    onSuccess: (response) => {
      const { status } = response || {};
      if (status === true) {
        queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
      }
    },
    onError: (error) => {
      console.error("Delete request failed:", error.response?.data?.message || error.message);
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
    enabled: !!id, // only run if ID is provided
  });
};
