import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, {useEffect} from 'react';
import {NAV_HEIGHT} from "../elements/Navbar";

const getPosition = (pos) => {
  const edge = '0'

  switch (pos) {
    case 'bottom-center':
      return {
        left: '50%',
        bottom: `${NAV_HEIGHT}rem`,
        top: 'unset',
        right: 'unset',
        t: '-50%'
      }
    case 'top-center':
      return {
        left: '50%',
        bottom: 'unset',
        top: `${NAV_HEIGHT}rem`,
        right: 'unset',
        t: '-50%'
      }
    case 'top-left':
      return {
        left: edge,
        bottom: 'unset',
        top: `${NAV_HEIGHT}rem`,
        right: 'unset',
        t: '0'
      }
    case 'bottom-left':
      return {
        left: edge,
        bottom: `${NAV_HEIGHT}rem`,
        top: 'unset',
        right: 'unset',
        t: '0'
      }
    case 'top-right':
      return {
        left: 'unset',
        bottom: 'unset',
        top: `${NAV_HEIGHT}rem`,
        right: edge,
        t: '0'
      }
    case 'bottom-right':
      return {
        left: 'unset',
        bottom: `${NAV_HEIGHT}rem`,
        top: 'unset',
        right: edge,
        t: '0'
      }
    default:
      return {
        left: '50%',
        bottom: `${NAV_HEIGHT}rem`,
        top: 'unset',
        right: 'unset',
        t: '-50%'
      }
  }
}

const StyledMessage = styled.span`
  display: block;
`

const StyledClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-weight: 900;
  padding-left: ${({theme}) => theme.sizes.gutters[2]};
  cursor: pointer;
  border-radius: 50%;
  user-select: none;
  background: transparent;
  width: 16px;
  height: 16px;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }

  &:before, &:after {
    position: absolute;
    left: 15px;
    display: flex;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: ${({theme}) => theme.color.main};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`

const StyledSnackbar = styled.div`
  display: flex;
  position: fixed;
  background: ${({theme, type}) => type === 'default' ? theme.background.secondary : theme.palette[type].light};
  top: ${({position}) => getPosition(position).top};
  bottom: ${({position}) => getPosition(position).bottom};
  left: ${({position}) => getPosition(position).left};
  right: ${({position}) => getPosition(position).right};
  min-height: 1.25rem;
  max-width: 350px;
  width: calc(90%);
  min-width: 200px;
  padding: ${({theme}) => `${ theme.sizes.gutters[4]} ${theme.sizes.gutters[3]}`};
  margin-top: ${({theme}) => theme.sizes.gutters[2]};
  margin-bottom: ${({theme}) => theme.sizes.gutters[2]};
  border-radius: ${({theme}) => theme.sizes.radius.md};
  box-sizing: border-box;
  box-shadow: 0 0 .5rem 0 ${({theme, type}) => type === 'default' ?
          theme.palette.dark.dark : theme.palette[type].glass};
  opacity: ${({open}) => open ? 1 : 0};
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
  user-select: text;
  transition: opacity .5s, visibility .5s ease-in-out;
  transform: ${({position}) => `translateX(${getPosition(position).t})`};
  z-index: ${({theme}) => theme.sizes.zIndex.max};

  @supports (backdrop-filter: blur(5px)) {
    background: ${({theme, type}) => type === 'default' ? theme.background.glass : theme.palette[type].glass};
    backdrop-filter: blur(.25rem);
  };

  ${StyledMessage} {
    font-weight: 500;
    color: ${({theme, type}) => type === 'default' ? theme.color.main : theme.palette[type].dark};
    flex: 2;
  }

  ${StyledClose} {
    color: ${({theme, type}) => type === 'default' ? theme.color.main : theme.palette[type].dark};
    font-weight: 900;
  }

`

const Snackbar = ({open, text, type = 'default', position = 'bottom-center', closeAfter = 0, onClose}) => {

  useEffect(() => {
    if (closeAfter > 0 && onClose) {
      setTimeout(() => {
        onClose()
      }, closeAfter)
    }
  }, [closeAfter, open])

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <StyledSnackbar open={open} type={type} position={position}>
      <StyledMessage>{text}</StyledMessage>
      <StyledClose onClick={handleClose}/>
    </StyledSnackbar>
  );
};

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark']),
  position: PropTypes.oneOf(['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right']),
  onClose: PropTypes.func,
  closeAfter: PropTypes.number,
}

export default Snackbar;