const commonTheme = {
  palette: {
    primary: {
      main: "hsl(218, 100%, 50%)",
      light: "hsl(218, 100%, 60%)",
      dark: "hsl(218, 100%, 30%)",
      glass: "hsla(218, 100%, 60%, .45)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    secondary: {
      main: "hsl(260,100%, 50%)",
      light: "hsl(260, 100%, 60%)",
      dark: "hsl(260, 100%, 30%)",
      glass: "hsla(260, 100%, 60%, .45)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    success: {
      main: "hsl(117,100%, 35%)",
      light: "hsl(115, 100%, 45%)",
      dark: "hsl(115, 100%, 25%)",
      glass: "hsla(115, 100%, 45%, .45)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    danger: {
      main: "hsl(0, 100%, 50%)",
      light: "hsl(0, 100%, 60%)",
      dark: "hsl(0, 100%, 30%)",
      glass: "hsla(0, 100%, 60%, .45)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    warning: {
      main: "hsl(20, 100%, 50%)",
      light: "hsl(20, 100%, 60%)",
      dark: "hsl(20, 100%, 30%)",
      glass: "hsla(20, 100%, 60%, .45)",
      contrastText: "hsl(0, 0%, 95%)",
    },
    info: {
      main: "hsl(210, 100%, 50%)",
      light: "hsl(210, 100%, 60%)",
      dark: "hsl(210, 100%, 30%)",
      glass: "hsla(210, 100%, 60%, .45)",
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
