import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

const ContainerStyled = styled.div`
  width: 100%;
  margin-left: auto;
  box-sizing: border-box;
  margin-right: auto;
  display: block;
  padding-left: ${({theme, maxWidth}) => maxWidth ? `${theme.sizes.gutters[4]}` : 0};
  padding-right: ${({theme, maxWidth}) => maxWidth ? `${theme.sizes.gutters[4]}` : 0};
  min-height: 100%;
  padding-top: ${({navPadding, maxWidth}) => navPadding && maxWidth ? `1rem` : 0};
  position: ${({posRelative}) => posRelative ? "relative" : "static"};
  max-width: ${({theme, maxWidth}) => maxWidth ? `${theme.breakpoints[maxWidth]}px}` : '100%'};

  @media (min-width: 600px) {
    padding-left: ${({theme, maxWidth}) => maxWidth ? `calc(${theme.sizes.gutters[4]} * 2)` : 0};
    padding-right: ${({theme, maxWidth}) => maxWidth ? `calc(${theme.sizes.gutters[4]} * 2)` : 0};
  }
`

const Container = ({
                     navPadding,
                     posRelative,
                     style,
                     maxWidth = "xl",
                     children,
                   }) => {
  return (
    <ContainerStyled
      navPadding={navPadding}
      posRelative={posRelative}
      maxWidth={maxWidth}
      style={style}
    >
      {children}
    </ContainerStyled>
  );
};

Container.propTypes = {
  navPadding: PropTypes.bool,
  posRelative: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", false]),
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Container;
