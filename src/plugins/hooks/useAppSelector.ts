import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "types/core/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
