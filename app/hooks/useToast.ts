import toast from 'react-hot-toast';
export const useToast = () => {
  const showErrorToast = (message: string): React.ReactNode => {
    toast.error(message);
    return null;
  };

  const showSuccessToast = (message: string): React.ReactNode => {
    toast.success(message);
    return null;
  };
  return { showErrorToast, showSuccessToast };
};
