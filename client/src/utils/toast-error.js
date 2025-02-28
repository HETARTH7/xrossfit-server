import { toast } from "react-toastify";

export const ToastError = (error) => {
  toast.error(error.response?.data?.message || "Something went wrong");
};
