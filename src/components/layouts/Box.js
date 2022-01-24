import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

//create a styled component for the box component
export const BoxStyled = styled.div`
    margin: ${props => props.margin};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    padding: ${props => props.padding};
    padding-top: ${props => props.paddingTop};
    padding-bottom: ${props => props.paddingBottom};
    padding-left: ${props => props.paddingLeft};
    width: ${props => props.width};
    height: ${props => props.height};
    max-width: ${props => props.maxWidth};
    max-height: ${props => props.maxHeight};
    display: ${props => props.display};`


// create a react custom box component to handle spacing and margins
const Box = ({
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    width,
    height,
    maxWidth,
    maxHeight,
    display,
    children
}) => {
    return (
        <BoxStyled
            margin={margin}
            marginTop={marginTop}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
            padding={padding}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            paddingLeft={paddingLeft}
            width={width}
            height={height}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            display={display}>
            {children}
        </BoxStyled>
    )
}
// prop types for the box component
Box.propTypes = {
    margin: PropTypes.string,
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
    marginLeft: PropTypes.string,
    padding: PropTypes.string,
    paddingTop: PropTypes.string,
    paddingBottom: PropTypes.string,
    paddingLeft: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,
    display: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Box;