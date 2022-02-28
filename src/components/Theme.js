import {Global, ThemeProvider} from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";
import {useDataContext} from "../hooks/context";
import {darkTheme, lightTheme} from "../utils/theme"

const styles = (theme) => ({
  "body, html": {
    margin: 0,
    padding: 0,
    background: theme.background.main,
    color: theme.color.main,
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    position: "relative",
    fontFamily: theme.typography.fontFamily,

    "@media(min-width: 1441px)": {
      maxWidth: "1440px",
      margin: "auto",
    },
  },

  "*": {
    scrollbarWidth: 'thin',

    "&::-webkit-scrollbar": {
      width: '.5rem',
      height: '.5rem'
    },
    "::-webkit-scrollbar-track": {
      background: '#f1f1f1'
    },
    "::-webkit-scrollbar-thumb": {
      background: '#cecece'
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: '#b3b3b3'
    }
  },

  "input, textarea": {
    boxSizing: "border-box",
  },

  "#root": {
    minHeight: "100%",
    width: "100%",
  },
  "h1, h2, h3, h4, h5, h6": {
    margin: 0,
    lineHeight: 1.25,
  },
  "a": {
    textDecoration: "none"
  }
});

const Theme = ({children}) => {
  const {preferences: {mode}} = useDataContext()

  const globalStyles = () => ({
    ...styles(mode === 'dark' ? darkTheme : lightTheme),
  });

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <Global styles={globalStyles}/>
      {children}
    </ThemeProvider>
  )

}

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export default Theme