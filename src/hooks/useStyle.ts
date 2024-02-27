import { useContext } from "react";
import StylesContext, { StylesContextProps } from "../context/StylesContext";

export const useStyles = () => {
    return useContext(StylesContext) as StylesContextProps
}

export default useStyles