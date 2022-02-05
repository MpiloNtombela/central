import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import Container from "./Container";

const StyledModal = styled.div`
  background: ${({theme}) => theme.background.secondary};
  width: 100%;
  border-radius: ${({theme, radius}) => theme.sizes.radius[radius]};
  padding: ${({theme}) => theme.sizes.gutters[1]};
  box-sizing: border-box;
`

const StyledModalOverlay = styled.div`
  background: hsla(0, 0%, 0%, .45);
  backdrop-filter: blur(.25rem);
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
  opacity: ${({open}) => open ? 1 : 0};
  position: fixed;
  top: ${({open}) => open ? 0 : `-100%`};
  left: ${({open}) => open ? 0 : `-100%`};
  bottom: ${({open}) => open ? 0 : `-100%`};
  right: ${({open}) => open ? 0 : `-100%`};
  z-index: ${({theme, open}) => open ? theme.sizes.zIndex.modal : -1};
  transition: opacity, visibility .5s ease-in-out;
`


const Modal = ({open, radius = 'sm', maxWidth = 'sm', children}) => {
  return (
    <StyledModalOverlay open={open}>
      <Container maxWidth={maxWidth} navPadding>
        <StyledModal radius={radius}>
          {children}
        </StyledModal>
      </Container>
    </StyledModalOverlay>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  radius: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  children: PropTypes.node,
}

export default Modal;