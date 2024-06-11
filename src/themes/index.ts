import { createTheme } from "@rneui/themed";

const commonColors = {
  primary: "#22A39F",
  black: "black",
  blue: "#186ff4",
  green: "#099f48",
  yellow: "#fbcf18",
  error: "#DF2E38",
  greyOutline: "#CCCCCC",
}

export const lightTheme = createTheme({
  lightColors: commonColors,
  darkColors: {
    ...commonColors,
    background: "black"
  },
})
