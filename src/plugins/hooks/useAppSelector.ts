import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "types/core/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
