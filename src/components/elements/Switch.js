import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';

const Slider = styled.span``

const StyledSwitch = styled.label`

  position: relative;
  display: inline-block;
  width: 2.25rem;
  height: 1rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  ${Slider} {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({theme}) => theme.palette.dark.main};
    border-radius: 9999rem;
    transition: .4s;

    &:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      top: -4px;
      left: -2px;
      background-color: ${({theme}) => theme.background.secondary};
      border-radius: 50%;
      transition: all .4s;
      transform: translateX(0);
      background-position: center;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .35);
    }
  }

  input:checked + ${Slider} {
    background-color: ${({theme}) => theme.palette.secondary.light};
  }

  input:checked + ${Slider}:before {
    background-color: ${({theme}) => theme.palette.secondary.dark};
  }

  input:focus + ${Slider}, input:focus + ${Slider}:before {
    box-shadow: 0 0 0 1px ${({theme}) => theme.palette.dark.dark};
  }

  input:checked:focus + ${Slider}, input:checked:focus + ${Slider}:before {
    box-shadow: 0 0 0 1px ${({theme}) => theme.palette.secondary.main};
  }

  input:checked + ${Slider}:before {
    transform: translateX(17px);
  }

  input:disabled + ${Slider} {
    background-color: ${({theme}) => theme.palette.dark.light};
  }

  input:disabled + ${Slider}:before {
    background-color: ${({theme}) => theme.palette.dark.main};
  }

  input:checked:disabled + ${Slider} {
    background-color: ${({theme}) => theme.palette.secondary.glass};
  }

  input:checked:disabled + ${Slider}:before {
    background-color: ${({theme}) => theme.palette.secondary.light};
  }
`

const Switch = ({onSwitch, disabled, checked, ariaLabel}) => {
  return (
    <StyledSwitch>
      <input aria-label={ariaLabel} onChange={onSwitch} disabled={disabled} checked={checked} type="checkbox"/>
      <Slider/>
    </StyledSwitch>
  )
};

Switch.propTypes = {
  onSwitch: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  ariaLabel: PropTypes.string,
}

export default Switch;