// import { CustomTheme, createTheme as createMuiTheme } from "@mui/material";
// import { createPalette } from "./palette";
// import { createComponents } from "./components";
// import { createShadows } from "./shadows";
// import { createTypography } from "./typography";
// import { Themes } from "models/assets";
// import { createSpace } from "./space";

// /** Default theming function for custom MUI theme */
// export function createTheme() {
//   const palette = createPalette();
//   const components = createComponents({ palette });
//   const shadows = createShadows();
//   const typography = createTypography();
//   const space = createSpace();

//   const theme: CustomTheme = {
//     breakpoints: {
//       values: {
//         xs: 0,
//         sm: 600,
//         md: 900,
//         lg: 1200,
//         xl: 1800,
//         xxl: 2400,
//         xxxl: 3200,
//       },
//     },
//     components,
//     palette,
//     space,
//     shadows,
//     shape: {
//       borderRadius: 8,
//     },
//     typography,
//   };

//   return createMuiTheme(theme);
// }

// /** The default theme, extendable to multi-theme capabilities */
// export const TeradactorTheme: Themes = {
//   light: createTheme(),
// };

// export default TeradactorTheme;
