import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";

export interface StylesProps {
  smallText: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  text: StyleProp<TextStyle>;

  container: StyleProp<ViewStyle>;
  flexContainer: StyleProp<ViewStyle>;
  minGapContainer: StyleProp<ViewStyle>;
  toastContainer: StyleProp<ViewStyle>;
  toastContent: StyleProp<ViewStyle>;
  row: StyleProp<ViewStyle>;
  col: StyleProp<ViewStyle>;
  modalBackdrop: StyleProp<ViewStyle>;
  modalContent: StyleProp<ViewStyle>;
  input: StyleProp<ViewStyle>;
  button: StyleProp<ViewStyle>;
  enfasizedButton: StyleProp<ViewStyle>;
  divider: StyleProp<ViewStyle>;
  horizontalBlock: StyleProp<ViewStyle>;
  fixedBottom: StyleProp<ViewStyle>;
  fixedBackground: StyleProp<ViewStyle>;
}

export const getStyles = async () => {
  const baseButton = {
    padding: 8,
    borderRadius: 4,
    minWidth: 48,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  } as ViewStyle;

  return StyleSheet.create({
    smallText: {
      fontSize: 10,
      fontWeight: "200",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
    },
    container: {
      backgroundColor: "white",
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
    minGapContainer: {
      gap: 4,
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
      backgroundColor: "white",
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
      backgroundColor: "white",
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
      backgroundColor: "white",
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#a0a3a1",
    },
    button: {
      ...baseButton,
      backgroundColor: "#fff",
    },
    enfasizedButton: {
      ...baseButton,
      backgroundColor: "#c0c2c0",
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
      backgroundColor: "#eeeeee",
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
      backgroundColor: "white",
    },
    fixedBackground: {
      position: "absolute",
      width: 48,
      height: 48,
      zIndex: -1,
      backgroundColor: "transparent",
    },
  });
};
