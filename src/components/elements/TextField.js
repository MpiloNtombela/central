import React from "react";
import PropTypes, { number, string } from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const fieldSize = (size) => {
  let _size = 1.25;

  switch (size) {
    case "sm":
      _size = 0.85;
      break;
    case "md":
      _size = 1.25;
      break;
    case "lg":
      _size = 1.45;
      break;
    default:
      return _size;
  }
  return _size;
};

const Label = styled.label(
  ({ theme }) => `
  position: absolute;
  left: .25rem;
  top: -.5rem;
  color: ${theme.color.secondary};
  font-size: 1rem;
  font-family: ${theme.typography.fontFamily};
  padding: 0 .25rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
  transform: translate(0, 24px) scale(1);
  z-index: 3;
`
);

const inputBase = ({ theme, bordered, fullWidth, size, color, error }) => {
  const bColor = error ? theme.palette.danger.main : theme.color.secondary;
  return css`
    color: ${theme.color.main};
    padding: 0.5rem;
    font-size: ${fieldSize(size)}em;
    font-weight: 500;
    font-family: ${theme.typography.fontFamily};
    border: ${bordered ? `2px solid ${bColor}` : "none"};
    border-bottom: 2px solid ${bColor};
    width: ${fullWidth ? "100%" : "initial"};
    border-radius: ${bordered ? ".25rem" : "0"};
    background: inherit;
    position: relative;
    z-index: 2;

    &:focus {
      border: ${bordered ? `2px solid ${theme.palette[color].main}` : "none"};
      border-bottom: 2px solid ${theme.palette[color].main};
      outline: none;
    }

    &:placeholder-shown ~ label {
      // visibility: hidden;
      transform: translate(0, 1.15rem) scale(1);
      z-index: 1;
    }

    &:not(:placeholder-shown) ~ label {
      visibility: visible;
      transform: translate(0, 1.5px) scale(0.75);
      transform-origin: top left;
      color: ${theme.palette[color].main};
      background: ${theme.background.secondary};
    }
  `;
};

const StyledInput = styled.input`
  ${inputBase}
`;

const StyledTextArea = styled.textarea`
  ${inputBase};
  resize: vertical;
  min-height: 2rem;
  max-height: 6rem;
`;

const StyledHelpText = styled.span(({ theme, helpText, error }) => {
  const display = helpText.trim().length > 0;
  return `
    color: ${error ? theme.palette.danger.main : "hsl(0, 0%, 30%, .5)"};
    margin: ${theme.sizes.gutters[1]} 0;
    padding: 0;
    font-size: .7em;
    font-weight: 500;
    display: ${display ? "block" : "none"}
`;
});

const TextField = ({
  id,
  name,
  type = "text",
  fullWidth,
  bordered,
  size = "md",
  placeholder = " ",
  label,
  multiline,
  rows = 3,
  value,
  color = "primary",
  error,
  helpText,
  onChange,
  required,
  style,
}) => {
  if (multiline) {
    return (
      <div style={{ position: "relative" }}>
        <StyledTextArea
          id={id}
          name={name}
          type={type}
          fullWidth={fullWidth}
          bordered={bordered}
          size={size}
          placeholder={placeholder}
          value={value}
          rows={rows}
          color={color}
          onChange={onChange}
          style={style}
          error={error}
          required={required}
        />
        <Label htmlFor={id ? id : name} color={color}>
          {label}
        </Label>
        {helpText && (
          <StyledHelpText helpText={helpText} error={error}>
            {helpText}
          </StyledHelpText>
        )}
      </div>
    );
  }
  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        id={id}
        name={name}
        type={type}
        fullWidth={fullWidth}
        bordered={bordered}
        size={size}
        placeholder={placeholder}
        value={value}
        color={color}
        onChange={onChange}
        style={style}
        error={error}
        required={required}
      />
      <Label htmlFor={id ? id : name} color={color}>
        {label}
      </Label>
      {helpText && (
        <StyledHelpText helpText={helpText} error={error}>
          {helpText}
        </StyledHelpText>
      )}
    </div>
  );
};
TextField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  bordered: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  helpText: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.oneOfType([string, number]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  error: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  required: PropTypes.bool,
};
export default TextField;
