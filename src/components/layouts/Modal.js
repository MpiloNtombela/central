import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import Container from "./Container";

const StyledModal = styled.div`
  background: ${({theme}) => theme.background.secondary};
  width: 100%;
  border-radius: ${({theme, radius}) => theme.sizes.radius[radius]};
  padding: ${({theme}) => theme.sizes.gutters[2]};
  box-sizing: border-box;
  margin: ${({theme}) => theme.sizes.gutters[4]};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${({elevation}) => elevation});
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
  transition: opacity .5s ease-in-out;
  overflow: auto;
  z-index: ${({theme, open}) => open ? theme.sizes.zIndex.modal : -1};
`


const Modal = ({open, centerVert, elevation = 1, radius = 'sm', maxWidth = 'sm', children}) => {
  return (
    <StyledModalOverlay open={open}>
      <Container maxWidth={maxWidth}
                 style={{display: centerVert ? 'flex' : 'block', alignItems: 'center'}}>
        <StyledModal radius={radius} elevation={elevation}>
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
  centerVert: PropTypes.bool,
  elevation: PropTypes.oneOf([1, 2, 3, 4])
}

export default Modal;