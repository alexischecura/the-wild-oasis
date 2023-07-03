import { useMutation } from "@tanstack/react-query";
import { signup as singupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: singupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { singup, isLoading };
}
