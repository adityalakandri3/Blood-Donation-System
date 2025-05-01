import { useMutation } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { signup } from "../../../Api/functions/userSignUp";
import { USERS } from "../query-keys/QueryKeys";






export const useUserSignUpMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (!!status && status === 200) {
         navigate("/signin");
        queryClient.invalidateQueries({ queryKey: [USERS] });
      } else {
         navigate("/signup");
         
      }
    },
  });
};
