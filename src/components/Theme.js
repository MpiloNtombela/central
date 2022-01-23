import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../utils/theme"

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
            boxShadow: "0 0 1rem 0 hsl(0, 0%, 20%, 20%)",
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
    "a":{
        textDecoration: "none"
    }
});

const Theme = ({children}) => {
    const [isLight, setIsLight] = useState(true);
    const [theme, setTheme] = useState(lightTheme);
    useEffect(() => {
        if (isLight) {
            setTheme(lightTheme);
            localStorage.setItem("mode", "light");
        } else {
            setTheme(darkTheme);
            localStorage.setItem("mode", "dark");
        }
    }, [isLight]);

    const globalStyles = () => ({
        ...styles(theme),
    });

    return (
        <ThemeProvider theme={ theme }>
            <Global styles={globalStyles}/>
            {children}
        </ThemeProvider>
    )

}

Theme.propTypes ={
    children: PropTypes.node.isRequired
}

export default Theme