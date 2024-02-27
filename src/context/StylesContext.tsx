import React, { createContext, ReactNode, useState, useEffect } from "react";

import { getStyles, StylesProps } from "../styles/styles";

export type StylesContextProps = {
    styles: StylesProps,
    getStyles: Function,
    setStyles: React.Dispatch<React.SetStateAction<{}>>,
    loading: boolean
}

const StylesContext = createContext({})

const StylesProvider = ({ children }: { children: ReactNode }) => {
    const [styles, setStyles] = useState<StylesContextProps | {}>({})
    const [loading, setLoading] = useState(true)

    const value = {
        styles,
        setStyles,
        getStyles,
        loading
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