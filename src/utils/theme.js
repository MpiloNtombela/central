const commonTheme = {
  palette: {
    primary: {
      main: "hsl(360,100%,50%)",
      light: "hsl(360, 100%, 60%)",
      dark: "hsl(360, 100%, 40%)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    secondary: {
      main: "hsl(0,0%,10%)",
      light: "hsl(0, 0%, 15%)",
      dark: "hsl(0, 0%, 5%)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    danger: {
      main: "hsl(0, 100%, 50%)",
      light: "hsl(0, 100%, 60%)",
      dark: "hsl(0, 100%, 40%)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    warning: {
      main: "hsl(20, 100%, 50%)",
      light: "hsl(20, 100%, 60%)",
      dark: "hsl(20, 100%, 40%)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    info: {
      main: "hsl(210, 100%, 50%)",
      light: "hsl(210, 100%, 60%)",
      dark: "hsl(210, 100%, 40%)",
      contrastText: "hsl(0, 0%, 95%)",
    },
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
      lg:25,
      xl:50,
      nav: 1030,
      modal: 1035,
      max: 9999,
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', sans-serif",
  },
};

export const lightTheme = {
  mode: "light",
  background: {
    main: "hsl(0, 0%, 90%)",
    secondary: "hsl(0, 0%, 100%)",
    glass: "hsla(0, 0%, 100%, .45)",
  },
  color: {
    main: "hsl(0, 0%, 20%)",
    secondary: "hsl(0, 0%, 50%)",
  },
  ...commonTheme,
};

export const darkTheme = {
  background: {
    main: "hsl(0, 0%, 20%)",
    secondary: "hsl(0, 0%, 30%)",
    glass: "hsla(0, 0%, 30%, .45)",
  },
  color: {
    main: "hsl(0, 0%, 95%)",
    secondary: "hsl(0, 0%, 50%)",
  },
  ...commonTheme,
};
