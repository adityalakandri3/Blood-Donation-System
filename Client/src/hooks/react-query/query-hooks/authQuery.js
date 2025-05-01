import { useMutation } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { signup } from "../../../Api/functions/userSignUp";
import { USERS } from "../query-keys/QueryKeys";
import { verifyOtp } from "../../../Api/functions/OtpVerify";
import { signin } from "../../../Api/functions/userSignIn";


export const useUserSignUpMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (!!status && status === true) {
         navigate("/otpverify");
        queryClient.invalidateQueries({ queryKey: [USERS] });
      } else {
         navigate("/signup"); 
      }
    },
  });
};


export const useOtpVerifyMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (!!status && status === true) {
        navigate("/signin"); // navigate to signin after OTP verified
        queryClient.invalidateQueries({ queryKey: [USERS] });
      } else {
        navigate("/otpverify"); // stay on the same page if OTP failed
      }
    },
  });
};



export const useUserSignInMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: signin,
    onSuccess: (response) => {
      const { status, message, token, data:{name} } = response || {};
      if (status === true) {

        localStorage.setItem("token", token)
        localStorage.setItem("name", name)
        localStorage.setItem("message", message)

        navigate("/homepage"); // redirect to dashboard on success
        queryClient.invalidateQueries({ queryKey: [USERS] });
      } else {
        navigate("/signin"); // stay or redirect back on failure
      }
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
    },
  });
};