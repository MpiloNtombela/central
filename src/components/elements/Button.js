import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";

const StyledButton = styled.button(
  ({ theme, color, gradient, size, outlined, rounded, block }) => {
    const b = theme.palette;
    const c = b[color];

    return `

  color: ${!outlined ? c.contrastText : c.main};
  background: ${!outlined
        ? gradient
          ? `linear-gradient(140deg, ${b.primary.main}, ${b.secondary.main})`
          : c.main
        : "transparent"
      };
  padding: ${size === "sm" ? ".3rem 1rem" : ".5rem 1.25rem"};
  text-transform: uppercase;
  font-weight: 500;
  // font-size: ${size === "sm" ? "1rem" : ".75em"};
  line-height: 1.25;
  border: ${outlined ? `2px solid ${c.main}` : "0"};
  border-radius: ${rounded ? "9999rem" : theme.sizes.radius};
  min-width: max-content;
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.75;
  text-align: center;
  letter-spacing: 0.02857em;
  box-shadow: 0px 0px 5px 0px hsla(0, 0%, 0%, .5);
  min-width: ${block ? '100%' : '64px'};
  transition: background, .5s, ease-in-out;

  &:hover {
    background: ${!outlined
        ? gradient
          ? `linear-gradient(315deg, ${b.primary.main}, ${b.secondary.main})`
          : c.main
        : "hsl(0, 0%, 90%)"
      };
    cursor: pointer;
    outline: none;
    opacity: .8;
  };
  &:disabled {
    background: ${outlined ? "transparent" : '#888'};
    color: #ccc;
    cursor: default;
    border: ${outlined ? `2px solid #888` : "0"};
    box-shadow: 0px 0px 2px 0px hsla(0, 0%, 0%, .5);
    opacity: 1;
  }
`;
  }
);

const Button = ({
  color = "primary",
  size = "md",
  type = "button",
  gradient,
  outlined,
  block,
  rounded,
  style,
  disabled,
  onClick,
  children,
}) => {
  return (
    <StyledButton
      color={ color }
      size={ size }
      outlined={ outlined }
      rounded={ rounded }
      style={ style }
      gradient={ gradient }
      onClick={ onClick }
      block={ block }
      disabled={ disabled }
      type={ type }>
      <span>{ children }</span>
    </StyledButton>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "success", 'warning', 'danger']),
  size: PropTypes.oneOf(["sm", "md"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  gradient: PropTypes.bool,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  block: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
