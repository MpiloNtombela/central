import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

const ContainerStyled = styled.div(
  ({ theme, navPadding, posRelative, maxWidth}) => `
  width: 100%;
  margin-left: auto;
  box-sizing: border-box;
  margin-right: auto;
  display: block;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100%;
  padding-top: ${navPadding ? `1rem` : 0};
  position: ${posRelative ? "relative" : "static"};
  max-width: ${theme.breakpoints[maxWidth]}px;

  @media (min-width: 600px){
    padding-left: 24px;
    padding-right: 24px;
  }
`
);

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
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Container;
