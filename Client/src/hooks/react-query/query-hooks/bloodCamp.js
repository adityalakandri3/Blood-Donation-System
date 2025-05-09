import { useMutation, useQuery } from "@tanstack/react-query";
import { BLOOD_CAMP } from "../query-keys/QueryKeys";
import { getAllCamps, getCampById } from "../../../Api/functions/bloodCamp";
import { useGlobalHooks } from "../../GlobalHooks";
import { cancelUserRegistration, getMyRegistrations, userRegistrationCamp } from "../../../api/functions/userCampRegistration";
import { toast } from "react-toastify";

export const useGetAllBloodCampQuery = () => {
  return useQuery({
    queryKey: [BLOOD_CAMP],
    queryFn: getAllCamps,
  });
};

export const useGetBloodCampById = (id) => {
  return useQuery({
    queryKey: [BLOOD_CAMP, id],
    queryFn: () => getCampById(id),
  });
};

export const useUserRegistrationCamp = (id) => {
  const { queryClient, navigate } = useGlobalHooks();
  return useMutation({
    mutationFn: (id) => userRegistrationCamp(id),
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message || "User registered successfully");
        queryClient.invalidateQueries({ queryKey: [BLOOD_CAMP] });
        navigate("/my-registrations");
      } else {
        toast.error(message || "Failed to register for camp.");
      }
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(`User Registration failed. ${errMsg}`);
      console.error("User Registration failed.", errMsg);
    },
  });
};

export const useCancelRegistration= (id) => {
  const { queryClient, navigate } = useGlobalHooks();
  return useMutation({
    mutationFn: (id) => cancelUserRegistration(id),
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message || "Registration cancelled successfully.");
        queryClient.invalidateQueries({ queryKey: [BLOOD_CAMP] });
        navigate("/my-registrations");
      } else {
        toast.error(message || "Failed to cancel registration.");
      }
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(` Registration cancel failed. ${errMsg}`);
      console.error(" Registration cancel failed.", errMsg);
    },
  });
};



export const useMyRegistrations = () => {
  return useQuery({
    queryKey: [BLOOD_CAMP],
    queryFn: getMyRegistrations,
  });
};
