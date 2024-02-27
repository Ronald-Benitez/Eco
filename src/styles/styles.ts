import { StyleSheet, StyleProp, TextStyle } from "react-native";

export interface StylesProps {
    SmallText: StyleProp<TextStyle>
}

export const getStyles = async () => {
    return StyleSheet.create({
        SmallText: {
            fontSize: 10,
            fontWeight: "200"
        }
    })
}