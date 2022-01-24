import {useContext} from "react";
import {DataContext, DispatchContext} from "../components/DataContext";

export const useDataContext = () => useContext(DataContext)
export const useDataDispatch = () => useContext(DispatchContext)