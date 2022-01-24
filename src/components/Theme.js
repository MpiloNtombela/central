import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Global, ThemeProvider} from "@emotion/react";
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

const Theme = ({children, isDark = true}) => {

  const globalStyles = () => ({
    ...styles(isDark ? darkTheme : lightTheme),
  });

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={globalStyles}/>
      {children}
    </ThemeProvider>
  )

}

Theme.propTypes = {
  isDark: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default Theme