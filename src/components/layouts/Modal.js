import {useTheme} from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import {NAV_HEIGHT} from "../elements/Navbar";
import Text from "../elements/Text";
import Box from "./Box";
import Container from "./Container";

const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({theme}) => theme.background.secondary};
  margin-bottom: ${({theme}) => theme.sizes.gutters[2]};
  font-size: ${({text}) => text ? '1.2rem' : 'inherit'};
  font-weight: ${({text}) => text ? '600' : 'inherit'};
  padding: 0 ${({theme}) => theme.sizes.gutters[3]};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${({elevation}) => elevation});
  box-sizing: border-box;
  height: ${NAV_HEIGHT}rem;
  position: ${({sticky}) => sticky ? 'sticky' : 'static'};
  top: ${({sticky}) => sticky ? 0 : 'auto'};
  left: ${({sticky}) => sticky ? 0 : 'auto'};
  right: ${({sticky}) => sticky ? 0 : 'auto'};
`

const StyledModalContent = styled.div`
  width: 100%;
  padding: ${({theme}) => theme.sizes.gutters[3]};
  box-sizing: border-box;
`

const StyledModal = styled.div`
  background: ${({theme}) => theme.background.secondary};
  width: 100%;
  border-radius: ${({theme, radius}) => radius ? theme.sizes.radius[radius] : 0};
  box-sizing: border-box;
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${({elevation}) => elevation});
  max-height: ${({
                   scrollOverlay,
                   maxWidth
                 }) => scrollOverlay ? `fit-content` : maxWidth ? `calc(100vh - 2rem)` : '100vh'};
  overflow-y: ${({scrollOverlay}) => scrollOverlay ? `hidden` : 'auto'};
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
  padding: ${({theme, maxWidth}) => maxWidth ? `${theme.sizes.gutters[4]}` : 0} 0;
  overflow-y: ${({scrollOverlay}) => scrollOverlay ? `auto` : 'hidden'};
  z-index: ${({theme, open}) => open ? theme.sizes.zIndex.modal : -1};
`

export const ModalHeader = ({
                              text,
                              sticky,
                              hasBack,
                              onBackClick,
                              onCloseClick,
                              hasClose = true,
                              elevation = 1,
                              children
                            }) => {
  const theme = useTheme()
  return (
    <StyledModalHeader text={text} elevation={elevation} sticky={sticky}>
      {hasBack && <Box marginRight={theme.sizes.gutters[3]} onClick={onBackClick}>
        &larr;
      </Box>}
      <Box
        style={{
          flex: 2,
          textOverflow: 'ellipsis',
          overflow: text ? 'hidden' : 'inherit',
          whiteSpace: text ? 'nowrap' : 'inherit'
        }}>{children ? children : text}</Box>
      {hasClose && <Box marginLeft={theme.sizes.gutters[3]} onClick={onCloseClick}>
        <Text fSize={'small'} fWeight={'bold'}>CLOSE</Text>
      </Box>}
    </StyledModalHeader>
  )
}

export const ModalContent = ({children}) => {
  return (
    <StyledModalContent>
      {children}
    </StyledModalContent>
  )
}

const Modal = ({open, centerVert, scrollOverlay = true, elevation = 1, radius = 'sm', maxWidth = 'sm', children}) => {
  return (
    <StyledModalOverlay open={open} scrollOverlay={scrollOverlay} maxWidth={maxWidth}>
      <Container maxWidth={maxWidth}
                 style={{display: centerVert ? 'flex' : 'block', alignItems: 'center'}}>
        <StyledModal radius={radius} elevation={elevation} scrollOverlay={scrollOverlay} maxWidth={maxWidth}>
          {children}
        </StyledModal>
      </Container>
    </StyledModalOverlay>
  );
};

ModalHeader.propTypes = {
  text: PropTypes.string,
  hasBack: PropTypes.bool,
  hasClose: PropTypes.bool,
  sticky: PropTypes.bool,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  children: PropTypes.node,
  onBackClick: PropTypes.func,
  onCloseClick: PropTypes.func,
}

ModalContent.propTypes = {
  children: PropTypes.node,
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  radius: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl", false]),
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", false]),
  children: PropTypes.node,
  centerVert: PropTypes.bool,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  scrollOverlay: PropTypes.bool,
}

export default Modal;