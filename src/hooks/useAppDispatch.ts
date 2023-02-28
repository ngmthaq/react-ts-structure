import { useDispatch } from "react-redux";
import { AppDispatch } from "spec/store";

// Export a hook that can be reused to resolve types
const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
