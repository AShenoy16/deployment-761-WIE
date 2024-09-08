import { useSnackbarStore } from "../stores/SnackBarStore";

const useSnackBar = () => {
  const setMessage = useSnackbarStore((state) => state.setMessage);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);

  const showSnackBar = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  return showSnackBar;
};

export default useSnackBar;
