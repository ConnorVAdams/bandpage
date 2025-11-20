import { alpha, lighten, darken } from "@mui/material/styles";

const withAlphas = (color: any) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: "#f4f4f4",
  100: "#e2e2e2",
  200: "#c6c6c6",
  300: "#aaaaaa",
  400: "#909090",
  500: "#767676",
  600: "#5d5d5d",
  700: "#454545",
  800: "#2f2f2f",
  900: "#1a1a1a",
  A100: "#77858a",
  A200: "#77858a",
  A400: "#77858a",
  A700: "#77858a",
};

export const primary = withAlphas({
  lightest: "#fdc99b",
  light: "#fca95f",
  main: "#FB9337",
  dark: "#c9762c",
  darkest: "#975821",
  contrastText: "#FFFFFF",
});

export const secondary = withAlphas({
  lightest: lighten("#2E3748", 0.2),
  light: lighten("#2E3748", 0.1),
  main: "#2E3748",
  dark: darken("#2E3748", 0.1),
  darkest: darken("#2E3748", 0.2),
  contrastText: "#6C737F",
});

export const colors = {
  neutral: neutral[100],
  red: "#F46B69",
  pink: "#C75E8C",
  violet: "#865D95",
  blue: "#4A577F",
  greyBlue: "#2F4858",
  orange: primary.main,
};

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
});

export const info = withAlphas({
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#06AED4",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
});

export const warning = withAlphas({
  lightest: "#FFFAEB",
  light: "#FEF0C7",
  main: "#F79009",
  dark: "#B54708",
  darkest: "#7A2E0E",
  contrastText: "#FFFFFF",
});

export const error = withAlphas({
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
});
