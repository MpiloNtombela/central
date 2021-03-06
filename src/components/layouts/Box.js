import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

export const BoxStyled = styled.div`
  margin: ${props => props.margin};
  margin-top: ${props => props.marginTop || props.marginY};
  margin-bottom: ${props => props.marginBottom || props.marginY};
  margin-left: ${props => props.marginLeft || props.marginX};
  margin-right: ${props => props.marginRight || props.marginX};
  padding: ${props => props.padding};
  padding-top: ${props => props.paddingTop || props.paddingY};
  padding-bottom: ${props => props.paddingBottom || props.paddingY};
  padding-left: ${props => props.paddingLeft || props.paddingX};
  padding-right: ${props => props.paddingRight || props.paddingX};
  width: ${props => props.width};
  height: ${props => props.height};
  max-width: ${props => props.maxWidth};
  max-height: ${props => props.maxHeight};
  display: ${props => props.display};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};

  &:hover {
    background: ${({hoverColor, isHover, theme}) => isHover ? hoverColor
                    ? hoverColor
                    : theme.background.glass
            : 'inherit'};
    cursor: ${({isHover, onClick}) => onClick || isHover ? 'pointer' : 'default'};
  }
`


const Box = ({
               margin,
               marginX,
               marginY,
               marginTop,
               marginBottom,
               marginLeft,
               marginRight,
               padding,
               paddingX,
               paddingY,
               paddingTop,
               paddingBottom,
               paddingLeft,
               paddingRight,
               width,
               height,
               maxWidth,
               maxHeight,
               display,
               alignItems,
               justifyContent,
               position,
               top,
               right,
               bottom,
               left,
               isHover,
               hoverColor,
               style,
               onClick,
               children
             }) => {
  return (
    <BoxStyled
      margin={margin}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
      position={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      isHover={isHover}
      hoverColor={hoverColor}
      onClick={onClick}
      style={style}>
      {children}
    </BoxStyled>
  )
}
// prop types for the box component
Box.propTypes = {
  margin: PropTypes.string,
  marginX: PropTypes.string,
  marginY: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  padding: PropTypes.string,
  paddingX: PropTypes.string,
  paddingY: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,
  paddingRight: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  display: PropTypes.oneOf(["inline", "block", "inline-block", "flex", "grid"]),
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  position: PropTypes.oneOf(["relative", "sticky", "absolute", "static", "fixed"]),
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  isHover: PropTypes.bool,
  hoverColor: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default Box;