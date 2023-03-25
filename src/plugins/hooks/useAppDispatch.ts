import { useDispatch } from "react-redux";
import { AppDispatch } from "types/core/store";

const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default useAppDispatch;
