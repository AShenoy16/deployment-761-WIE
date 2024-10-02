import { useSnackbarStore } from "../stores/SnackBarStore";

const useSnackBar = () => {
  const setMessage = useSnackbarStore((state) => state.setMessage);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);
  const setSeverity = useSnackbarStore((state) => state.setSeverity);

  const showSnackBar = (message: string, isSuccess: boolean) => {
    setMessage(message);
    setIsOpen(true);
    isSuccess ? setSeverity("success") : setSeverity("error");
  };

  return showSnackBar;
};

export default useSnackBar;
