import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";

import { type Theme } from "../interfaces/configs";
import { readFile, writeFile } from "../helpers/FilesHelper";
import data from "../files/configs.json";

export interface StylesProps {
  smallText: StyleProp<TextStyle>;
  middleText: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  text: StyleProp<TextStyle>;
  textColor: StyleProp<TextStyle>;
  enfasizedText: StyleProp<TextStyle>;
  textCenter: StyleProp<TextStyle>;

  bgPrimary: StyleProp<ViewStyle>;
  container: StyleProp<ViewStyle>;
  flexContainer: StyleProp<ViewStyle>;
  wrapContainer: StyleProp<ViewStyle>;
  minGapContainer: StyleProp<ViewStyle>;
  dropdowmContainer: StyleProp<ViewStyle>;
  toastContainer: StyleProp<ViewStyle>;
  toastContent: StyleProp<ViewStyle>;
  row: StyleProp<ViewStyle>;
  col: StyleProp<ViewStyle>;
  modalBackdrop: StyleProp<ViewStyle>;
  modalContent: StyleProp<ViewStyle>;
  input: StyleProp<ViewStyle>;
  button: StyleProp<ViewStyle>;
  enfasizedButton: StyleProp<ViewStyle>;
  backgroundButton: StyleProp<ViewStyle>;
  disabledButton: StyleProp<ViewStyle>;
  divider: StyleProp<ViewStyle>;
  horizontalBlock: StyleProp<ViewStyle>;
  fixedBottom: StyleProp<ViewStyle>;
  fixedBackground: StyleProp<ViewStyle>;
  fixedTop: StyleProp<ViewStyle>;
  colorView: StyleProp<ViewStyle>;
  colorContainer: StyleProp<ViewStyle>;
  colorBlock: StyleProp<ViewStyle>;
  primitiveModalContainer: StyleProp<ViewStyle>;
  centerer: StyleProp<ViewStyle>;
  pillContainer: StyleProp<ViewStyle>;
  pill: StyleProp<ViewStyle>;
  brigthnessBlock: StyleProp<ViewStyle>;
  brightnessSelector: StyleProp<ViewStyle>;
  underBlock: StyleProp<ViewStyle>;
  moodViewHorizontal: StyleProp<ViewStyle>;
  moodViewVertical: StyleProp<ViewStyle>;
}

export const getStyles = async () => {
  let colors = data as Theme;

  try {
    const res = await readFile("colors.json");
    if (res) {
      colors = JSON.parse(res) as Theme;
    }
  } catch (e) {
    console.log(e);
    await writeFile("colors.json", JSON.stringify(data));
  }

  const baseButton = {
    padding: 8,
    borderRadius: 4,
    minWidth: 48,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    flexDirection: "row",
    gap: 8,
  } as ViewStyle;

  return StyleSheet.create({
    smallText: {
      fontSize: 10,
      fontWeight: "200",
      color: colors.colors.primaryText || "black",
    },
    middleText: {
      fontSize: 14,
      fontWeight: "300",
      color: colors.colors.primaryText || "black",
      marginHorizontal: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.colors.primaryText || "black",
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      color: colors.colors.primaryText || "black",
      marginHorizontal: 10,
    },
    textColor: {
      fontWeight: "bold",
      fontSize: 15,
      borderColor: "black",
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      height: 40,
      textAlign: "center",
      textAlignVertical: "center",
      color: colors.colors.primaryText || "black",
    },
    enfasizedText: {
      fontSize: 16,
      fontWeight: "400",
      color: colors.colors.accentText || "black",
      marginHorizontal: 10,
    },
    textCenter: {
      textAlign: "center",
    },

    bgPrimary: {
      backgroundColor: colors.colors.primaryBackground || "white",
    },
    container: {
      backgroundColor: colors.colors.primaryBackground || "white",
      width: "100%",
      height: "100%",
      padding: 16,
      gap: 16,
    },
    flexContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    wrapContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      gap: 5,
    },
    minGapContainer: {
      gap: 4,
    },
    dropdowmContainer: {
      width: "100%",
      alignItems: "center",
      padding: 10,
      elevation: 5,
      backgroundColor: "#fff",
      borderRadius: 5,
    },
    toastContainer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      alignItems: "center",
      padding: 10,
    },
    toastContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: colors.colors.toastBackground || "white",
      borderRadius: 5,
      gap: 10,
      minHeight: 50,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    col: {
      flexDirection: "column",
      gap: 16,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.colors.secondaryBackground || "white",
      borderRadius: 8,
      padding: 16,
      minWidth: 200,
      maxWidth: 350,
      gap: 16,
    },
    input: {
      minWidth: 200,
      minHeight: 48,
      padding: 6,
      paddingHorizontal: 12,
      backgroundColor: colors.colors.inputBackground || "white",
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.colors.inputBorder || "#a0a3a1",
      color: colors.colors.inputText || "black",
    },
    button: {
      ...baseButton,
      backgroundColor: "#fff",
    },
    enfasizedButton: {
      ...baseButton,
      backgroundColor: colors.colors.accentBackground || "white",
    },
    backgroundButton: {
      flex: 1,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.colors.primaryBackground || "white",
      
    },
    disabledButton: {
      ...baseButton,
      backgroundColor: colors.colors.disabled || "gray",
    },
    divider: {
      width: "100%",
      height: 1,
      backgroundColor: "#a0a3a1",
    },
    horizontalBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.colors.secondaryBackground || "#eeeeee",
      minHeight: 48,
      padding: 8,
      borderRadius: 4,
    },
    fixedBottom: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 16,
      padding: 10,
      justifyContent: "space-around",
      flexDirection: "row",
      backgroundColor: colors.colors.primaryBackground || "white",
    },
    fixedBackground: {
      position: "absolute",
      width: 48,
      height: 48,
      zIndex: -1,
      backgroundColor: "transparent",
    },
    fixedTop: {
      position: "absolute",
      width: "100%",
      top: 0,
      padding: 10,
      justifyContent: "space-around",
      flexDirection: "row",
      backgroundColor: colors.colors.primaryBackground || "white",
    },
    colorView: {
      width: 48,
      height: 48,
      borderRadius: 5,
      elevation: 5,
      margin: 4,
    },
    colorContainer: {
      maxWidth: 300,
      maxHeight: 75,
    },
    colorBlock: {
      width: 100,
      height: 100,
      borderRadius: 5,
      margin: 4,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#00000025",
      borderWidth: 1,
    },
    primitiveModalContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      top: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    centerer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    pillContainer: {
      minWidth: 48,
      minHeight: 48,
    },
    pill: {
      borderRadius: 50,
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderWidth: 1,
      fontSize: 12,
      gap: 8,
      textAlign: "center",
    },
    brigthnessBlock: {
      borderRadius: 5,
      elevation: 5,
      margin: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    brightnessSelector: {
      position: "absolute",
      width: 35,
      height: 35,
      borderRadius: 100,
      elevation: 15,
      borderColor: "white",
      borderWidth: 3,
      backgroundColor: "transparent",
    },
    underBlock: {
      width: 48,
      height: 48,
      elevation: 10,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
    moodViewHorizontal: {
      width: "100%",
      height: 10,
      borderRadius: 5,
    },
    moodViewVertical: {
      width: 5,
      height: "100%",
      position: "absolute",
      left: 0,
    },
  });
};
