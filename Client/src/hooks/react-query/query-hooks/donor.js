import { useMutation, useQuery } from "@tanstack/react-query";
import { BLOOD_REQUESTS } from "../query-keys/QueryKeys";
import { acceptBloodRequestByDonor, getAllrequestForDonor, getAllrequestForDonorById } from "../../../api/functions/donorApi";
import { toast } from "react-toastify";
import { useGlobalHooks } from "../../GlobalHooks";

export const useGetAllBloodRequestsForDonor = () => {
    return useQuery({
      queryKey: [BLOOD_REQUESTS],
      queryFn: getAllrequestForDonor,
    });
  };

  export const  useGetBloodRequestByIdForDonor= (id) => {
    return useQuery({
      queryKey: [BLOOD_REQUESTS, id],
      queryFn: () => getAllrequestForDonorById(id),
    });
  };


  export const useUpdateBloodRequestforDonor = () => {
    const { queryClient, navigate } = useGlobalHooks();
  
    return useMutation({
      mutationFn: (id) => acceptBloodRequestByDonor(id), 
      onSuccess: (response) => {
        const { status, message } = response || {};
  
        if (status === true) {
          toast.success(message || "Blood Request accepted successfully");
          queryClient.invalidateQueries({ queryKey: [BLOOD_REQUESTS] });
          navigate("/get-blood-request-donor");
        } else {
          toast.error(message || "Blood Request acceptance failed.");
        }
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Something went wrong during update"
        );
      },
    });
  };
  