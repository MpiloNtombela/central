import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {ButtonBase} from "./Button";

const Anchor = styled.a`
  color: ${({color, theme, renderButton}) => renderButton ? 'inherit' : theme.palette[color]?.main};
  text-decoration: none;

  &:hover {
    color: ${({color, theme, renderButton}) => renderButton ? 'inherit' : theme.palette[color]?.light};;
  }

  &:focus {
    color: ${({color, theme, renderButton}) => renderButton ? 'inherit' : theme.palette[color]?.dark};
  }

  &:visited {
    color: ${({color, theme, renderButton}) => renderButton ? 'inherit' : theme.palette[color]?.glass};
  }

  ${({renderButton}) => renderButton && ButtonBase}
`

Anchor.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "success", 'warning', 'danger', 'info']),
  renderButton: PropTypes.bool,
}

Anchor.defaultProps = {
  color: 'primary',
  renderButton: false,
  elevation: 2,
}

export default Anchor