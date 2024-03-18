import React, { createContext, ReactNode, useState, useEffect } from "react";

import { getStyles, StylesProps } from "../styles/styles";
import { writeFile, readFile } from "../helpers/FilesHelper";
import { Theme } from "../interfaces/configs";
import data from "@/src/files/configs.json";

export type StylesContextProps = {
    styles: StylesProps,
    getStyles: Function,
    setStyles: React.Dispatch<React.SetStateAction<{}>>,
    loading: boolean,
    colors: Theme,
    setColors: React.Dispatch<React.SetStateAction<Theme>>,
    reloadColors: Function
}

const StylesContext = createContext({})

const StylesProvider = ({ children }: { children: ReactNode }) => {
    const [styles, setStyles] = useState<StylesContextProps | {}>({})
    const [colors, setColors] = useState<Theme>(data)
    const [loading, setLoading] = useState(true)

    const reloadColors = async () => {
        const res = await readFile('colors.json')
        setColors(JSON.parse(res) as Theme)
    }

    const value = {
        styles,
        setStyles,
        getStyles,
        loading,
        colors,
        setColors,
        reloadColors
    }

    useEffect(() => {
        if (Object.keys(styles).length < 1) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [styles])

    return (
        <StylesContext.Provider value={value}>
            {children}
        </StylesContext.Provider>
    )

}

export { StylesProvider }
export default StylesContext