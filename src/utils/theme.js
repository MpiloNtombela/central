import {contrastColor} from "./colors";

const colors = {
  primary: {
    main: "hsl(218, 100%, 50%)",
    light: "hsl(218, 100%, 60%)",
    dark: "hsl(218, 100%, 30%)",
    glass: "hsla(218, 100%, 60%, .45)",
  },
  secondary: {
    main: "hsl(260,100%, 50%)",
    light: "hsl(260, 100%, 60%)",
    dark: "hsl(260, 100%, 30%)",
    glass: "hsla(260, 100%, 60%, .45)",
  },
  success: {
    main: "hsl(117,100%, 35%)",
    light: "hsl(115, 100%, 45%)",
    dark: "hsl(115, 100%, 25%)",
    glass: "hsla(115, 100%, 45%, .45)",
  },
  danger: {
    main: "hsl(0, 100%, 50%)",
    light: "hsl(0, 100%, 60%)",
    dark: "hsl(0, 100%, 30%)",
    glass: "hsla(0, 100%, 60%, .45)",
  },
  warning: {
    main: "hsl(20, 100%, 50%)",
    light: "hsl(20, 100%, 60%)",
    dark: "hsl(20, 100%, 30%)",
    glass: "hsla(20, 100%, 60%, .45)",
  },
  info: {
    main: "hsl(210, 100%, 50%)",
    light: "hsl(210, 100%, 60%)",
    dark: "hsl(210, 100%, 30%)",
    glass: "hsla(210, 100%, 60%, .45)",
  },
  dark: {
    main: "hsl(0,0%,50%)",
    light: "hsl(0,0%,75%)",
    dark: "hsl(0,0%,45%)",
    glass: "hsla(0,0%,75%, .45)",
  }
}

const commonTheme = (colors) => ({
  palette: {
    primary: {
      ...colors.primary,
      contrastText: contrastColor(colors.primary.main).color,
      contrast: {
        dark: contrastColor(colors.primary.dark).color,
        light: contrastColor(colors.primary.light).color,
        glass: contrastColor(colors.primary.glass).color
      }
    },
    secondary: {
      ...colors.secondary,
      contrastText: contrastColor(colors.secondary.main).color,
      contrast: {
        dark: contrastColor(colors.secondary.dark).color,
        light: contrastColor(colors.secondary.light).color,
        glass: contrastColor(colors.secondary.glass).color
      }
    },
    success: {
      ...colors.success,
      contrastText: contrastColor(colors.success.main).color,
      contrast: {
        dark: contrastColor(colors.success.dark).color,
        light: contrastColor(colors.success.light).color,
        glass: contrastColor(colors.success.glass).color
      }
    },
    danger: {
      ...colors.danger,
      contrastText: contrastColor(colors.danger.main).color,
      contrast: {
        dark: contrastColor(colors.danger.dark).color,
        light: contrastColor(colors.danger.light).color,
        glass: contrastColor(colors.danger.glass).color
      }
    },
    warning: {
      ...colors.warning,
      contrastText: contrastColor(colors.warning.main).color,
      contrast: {
        dark: contrastColor(colors.warning.dark).color,
        light: contrastColor(colors.warning.light).color,
        glass: contrastColor(colors.warning.glass).color
      }
    },
    info: {
      ...colors.info,
      contrastText: contrastColor(colors.info.main).color,
      contrast: {
        dark: contrastColor(colors.info.dark).color,
        light: contrastColor(colors.info.light).color,
        glass: contrastColor(colors.info.glass).color
      }
    },
    dark: {
      ...colors.dark,
      contrastText: contrastColor(colors.dark.main).color,
      contrast: {
        dark: contrastColor(colors.dark.dark).color,
        light: contrastColor(colors.dark.light).color,
        glass: contrastColor(colors.dark.glass).color
      }
    }
  },
  breakpoints: {
    sm: 575,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1440,
  },
  sizes: {
    radius: {
      sm: ".25rem",
      md: ".5rem",
      lg: ".75rem",
      xl: "1rem",
      xxl: "1.5rem"
    },
    gutters: {
      1: ".25rem",
      2: ".50rem",
      3: ".75rem",
      4: "1rem",
    },
    zIndex: {
      sm: 1,
      md: 10,
      lg: 25,
      xl: 50,
      nav: 1030,
      modal: 1035,
      max: 9999,
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', sans-serif",
    fontsize: {
      xs: '.65rem',
      sm: '.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      header: '1.85rem',
      paragraph: '.9rem'
    }
  },
})

export const createTheme = (theme = colors) => {
  const colorx = {...colors}

  for (let key of Object.keys(colorx)) {
    if (theme[key] !== undefined) {
      for (let k of Object.keys(colorx[key])) {
        if (theme[key][k] !== undefined && colorx[key][k] !== theme[key][k]) {
          colorx[key][k] = theme[key][k]
        }
      }
    }
  }
  return commonTheme(colorx)
}

export const lightTheme = (theme = createTheme()) => ({
  mode: "light",
  background: {
    main: "hsl(0, 0%, 90%)",
    secondary: "hsl(0, 0%, 100%)",
    glass: "hsla(0, 0%, 100%, .45)",
  },
  color: {
    main: "hsl(0, 0%, 20%)",
    secondary: "hsl(0, 0%, 60%)",
  },
  ...theme,
});

export const darkTheme = (theme = createTheme()) => ({
  background: {
    main: "hsl(0, 0%, 20%)",
    secondary: "hsl(0, 0%, 30%)",
    glass: "hsla(0, 0%, 30%, .45)",
  },
  color: {
    main: "hsl(0, 0%, 95%)",
    secondary: "hsl(0, 0%, 70%)",
  },
  ...theme,
});
