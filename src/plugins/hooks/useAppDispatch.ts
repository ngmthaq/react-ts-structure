import { useDispatch } from "react-redux";
import { AppDispatch } from "types/core/store";

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
