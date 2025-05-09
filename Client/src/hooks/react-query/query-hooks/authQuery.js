import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { signup } from "../../../Api/functions/userSignUp";
import { USERS } from "../query-keys/QueryKeys";
import { verifyOtp } from "../../../Api/functions/OtpVerify";
import { signin } from "../../../Api/functions/userSignIn";
import { toast } from "react-toastify";
import { dashboard } from "../../../api/functions/profile";
import { fetchUserProfile } from "../../../api/functions/profileData";
import { profileUpdate } from "../../../api/functions/profileUpdate";
import { updatePassword } from "../../../api/functions/updatePassword";

export const useUserSignUpMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (data.status === true) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: [USERS] });
        setTimeout(() => navigate("/otpverify"), 1000);
      } else {
        toast.error(data.message || "Signup failed");
        setTimeout(() => navigate("/signup"), 1000);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup error");
    },
  });
};

export const useOtpVerifyMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: [USERS] });
        setTimeout(() => navigate("/signin"), 1000);
      } else {
        toast.error(message || "OTP verification failed");
        setTimeout(() => navigate("/otpverify"), 1000);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "OTP verification error");
    },
  });
};

export const useUserSignInMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: signin,
    onSuccess: (response) => {
      const {
        status,
        message,
        token,
        data: { name },
      } = response || {};
      if (status === true) {
        toast.success(message);
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("message", message);
        queryClient.invalidateQueries({ queryKey: [USERS] });
        navigate("/");
      } else {
        toast.error(message || "Sign in failed");
        setTimeout(() => navigate("/signin"), 1000);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Sign in error");
    },
  });
};

export const useDashboard = () => {
  return useQuery({
    queryKey: [USERS],
    queryFn: dashboard,
  });
};

export const useProfileFetchDetails = (id) => {
  return useQuery({
    queryKey: [USERS, id],
    queryFn: () => fetchUserProfile(id),
  });
};

export const useUpdateProfile = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: ({ id, data }) => profileUpdate(id, data),
    onSuccess: (response) => {
      const { status, message } = response || {};

      if (status === true) {
        toast.success(message || "Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: [USERS] });
        navigate("/profile");
      } else {
        toast.error(message || "Profile update failed");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Something went wrong during update"
      );
    },
  });
};

export const useUpdatePassword = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: (data) => updatePassword(data),
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message || "Password updated successfully");
        queryClient.invalidateQueries({ queryKey: [USERS] });
        navigate("/profile");
      } else {
        toast.error(message || "Password update failed");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });
};
export const useLogout = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("message");

    queryClient.invalidateQueries({ queryKey: [USERS] });
    toast.success("Logout Successful!");
    navigate("/signin");
  };
};
