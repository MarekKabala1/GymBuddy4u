import toast from 'react-hot-toast';
export const useToast = () => {
  const showErrorToast = (message: string) => {
    toast.error(message);
  };
  const showSuccessToast = (message: string) => {
    toast.success(message);
  };
  return { showErrorToast, showSuccessToast };
};
