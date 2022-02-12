import {css} from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

export const ButtonBase = ({theme, color, gradient, size, outlined, rounded, block, disabled, elevation}) => {
  const b = theme.palette;
  const c = b[color];

  return css`
    display: block;
    color: ${!outlined ? c.contrastText : c.main};
    background: ${!outlined ?
            gradient ? `linear-gradient(140deg, ${b.primary.main}, ${b.secondary.main})`
                    : c.main
            : "transparent"
    };
    padding: ${size === "sm" ? ".25rem 1rem" : ".45rem 1.25rem"};
    text-transform: uppercase;
    font-weight: 500;
    line-height: 1.5;
    border: 2px solid ${disabled ? '#888' : c.main};
    border-radius: ${rounded ? "9999rem" : theme.sizes.radius.sm};
    font-size: 0.875rem;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 0.02857em;
    box-shadow: 0 0 5px 0 hsla(0, 0%, 0%,.${elevation});
    min-width: ${block ? '100%' : '64px'};

    &:hover {
      background: ${(outlined ? c.glass : gradient
              ? `linear-gradient(315deg, ${b.primary.main}, ${b.secondary.main})`
              : c.light)
      };
      cursor: pointer;
      outline: none;
      border-color: ${disabled ? '#888' : outlined ? c.main : c.light};
    }
  ;

    &:disabled {
      background: ${outlined ? "transparent" : '#888'};
      color: ${outlined ? '#888' : '#ccc'};
      cursor: default;
      border-color: #888;
      box-shadow: 0 0 2px 0 hsla(0, 0%, 0%,.${elevation});
      opacity: 1;
    }

    &:focus {
      background: ${(outlined ? c.glass : gradient
              ? `linear-gradient(315deg, ${b.primary.main}, ${b.secondary.main})`
              : c.dark)
      };
      box-shadow: 0 0 .5rem ${c.dark};
      border-color: ${c.dark}
    }
  `
}

const StyledButton = styled.button`
  ${ButtonBase}
`;

const Button = ({
                  color = "primary",
                  size = "md",
                  type = "button",
                  elevation = 2,
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
      color={color}
      size={size}
      outlined={outlined}
      rounded={rounded}
      style={style}
      gradient={gradient}
      onClick={onClick}
      block={block}
      disabled={disabled}
      elevation={elevation}
      type={type}>
      <span>{children}</span>
    </StyledButton>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "success", 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(["sm", "md"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  gradient: PropTypes.bool,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  block: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
