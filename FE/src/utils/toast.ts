import toast from "react-hot-toast";

export const ToastSucess = (notify: string) => {
  toast.success(notify, {
    duration: 5000,
  });
};

export const ToastError = (notify: string) => {
  toast.error(notify, {
    duration: 5000, 
  });
};
