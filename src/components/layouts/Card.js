import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const cardBase = ({ theme, maxWidth, shadow }) => css`
  background: ${theme.background.secondary};
  border-radius: ${theme.sizes.radius.md};
  box-shadow: ${shadow ? "0px 0px 10px 0px hsla(0, 0%, 0%, .2)" : "none"};
  font-family: ${theme.typography.fontFamily};
  color: ${theme.color.main};
  max-width: ${theme.breakpoints[maxWidth]}px;
  z-index: 10;
`;

export const CardBase = styled.div`
  ${cardBase}
`;

const StyledCard = styled.div`
  ${cardBase};
  padding: 0.75rem;
  margin: 0.75rem auto;

`;

const Card = ({ maxWidth = "xl", shadow = true, children }) => {
  return (
    <StyledCard maxWidth={ maxWidth } shadow={ shadow }>
      { children }
    </StyledCard>
  );
};

Card.propTypes = {
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.bool,
  children: PropTypes.node,
};

export default Card;
