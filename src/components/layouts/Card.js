import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";
import {css} from "@emotion/react";

const cardBase = ({theme, maxWidth, bgColor, shadow}) => css`
  background: ${bgColor ?
          bgColor === "main" ? theme.bgColor.main
                  : theme.palette[bgColor].main
          : theme.bgColor.secondary};
  border-radius: ${theme.sizes.radius.md};
  box-shadow: ${shadow ? "0px 0px 10px 0px hsla(0, 0%, 0%, .2)" : "none"};
  font-family: ${theme.typography.fontFamily};
  color: ${bgColor ? bgColor === "main" ? theme.color.main
          : theme.palette[bgColor].contrastText
          : theme.color.main};
  max-width: ${theme.breakpoints[maxWidth]}px;
  z-index: 10;
`;

export const CardBase = styled.div`
  ${cardBase}
`;

const StyledCard = styled.div`
  ${cardBase};
  padding: ${({theme}) => theme.sizes.gutters[2]};
  margin: ${({theme, marginY}) => marginY === 0 ? 0 : theme.sizes.gutters[marginY]} auto;
`;

const Card = ({bgColor, marginY = 0, maxWidth = "xl", shadow = true, children}) => {
  return (
    <StyledCard maxWidth={maxWidth} marginY={marginY} shadow={shadow} bgColor={bgColor}>
      {children}
    </StyledCard>
  );
};

Card.propTypes = {
  bgColor: PropTypes.oneOf(["main", "primary", "secondary", "success", "warning", "danger", "info"]),
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.bool,
  children: PropTypes.node,
  marginY: PropTypes.oneOf([0, 1, 2, 3, 4]),
};

export default Card;
