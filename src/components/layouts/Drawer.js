import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'

export const DrawerContainer = styled.div(({drawerAnchor, drawerOpen, drawerWidth, drawerFixed}) => `
    width: 100%;
    height: 100%;
    padding-left: ${drawerAnchor === 'left' && drawerOpen && drawerFixed ? `${drawerWidth}px` : 0};
    padding-right: ${drawerAnchor === 'right' && drawerOpen && drawerFixed ? `${drawerWidth}px` : 0};
    box-sizing: border-box;
    transition: all .55s ease-in-out;
`)

const StyledDrawerOverlay = styled.div(({theme, anchor, open, fixed}) => `
    position: fixed;
    top: ${!open && anchor === "top" ? "-100%" : "0"};
    bottom: ${!open && anchor === "bottom" ? "-100%" : "0"};
    right: ${!open && anchor === "right" ? "-100%" : "0"};
    left: ${!open && anchor === "left" ? "-100%" : "0"};
    visibility: ${open ? "visible" : "hidden"};
    background: ${fixed ? "transparent" : "rgba(0, 0, 0, .05)"};
    opacity: ${open ? 1 : 0};
    width: 100%;
    pointer-events: ${fixed ? 'none' : 'auto'};
    z-index: ${fixed ? theme.sizes.zIndex.nav - 1 : theme.sizes.zIndex.modal - 1};
    transition: all .55s ease-in-out;
`)
const StyledDrawer = styled.div(({theme, anchor, open, width, minHeight, fixed, elevation, rounded}) => `
    position: ${fixed ? 'fixed' : 'absolute'};
    left: ${anchor !== 'right' ? open ? '0' : anchor !== "left" ? "0" : '-100%' : 'unset'};
    right: ${anchor !== 'left' ? open ? '0' : anchor !== "right" ? "0" : '-100%' : 'unset'};
    top: ${anchor !== 'bottom' ? open ? '0' : anchor !== "top" ? "0" : '-100%' : 'unset'};
    bottom: ${anchor !== 'top' ? open ? '0' : anchor !== "bottom" ? "0" : '-100%' : 'unset'};
    box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .${elevation});
    border-top-right-radius: ${anchor === 'bottom' && rounded ? '1.25rem' : 0};
    border-top-left-radius:  ${anchor === 'bottom' && rounded ? '1.25rem' : 0};
    pointer-events: auto;
    box-sizing: border-box;
    width: ${anchor === 'top' || anchor === 'bottom' ? '100%' : width ? width : 'auto'};
    min-height: ${anchor === 'left' || anchor === 'right' ? '100%' : minHeight ? minHeight : 'fit-content'};
    background: ${theme.background.main};
    transition: all .5s ease-in-out;
`)

const Drawer = ({
                  open,
                  fixed,
                  width,
                  overlayStyle,
                  style,
                  minHeight,
                  rounded,
                  onClose,
                  elevation = 0,
                  anchor = "left",
                  children
                }) => {

  const handleClick = (e) => {
    if (fixed) return;
    const cont = e.currentTarget;
    const drawer = cont.querySelector('[data-drawer]')
    if (drawer !== e.target && !drawer.contains(e.target)) {
      onClose()
    }
  }

  return (
    <StyledDrawerOverlay
      onClick={e => handleClick(e)}
      anchor={anchor}
      open={open}
      fixed={fixed}
      style={overlayStyle}>
      <StyledDrawer
        data-drawer
        fixed={fixed}
        open={open}
        anchor={anchor}
        width={typeof width === 'number' ? `${width}px` : width}
        minHeight={typeof minHeight === 'number' ? `${minHeight}px` : minHeight}
        rounded={rounded}
        elevation={elevation}
        style={style}>
        {children}
      </StyledDrawer>
    </StyledDrawerOverlay>
  )
}

DrawerContainer.propTypes = {
  drawerAnchor: PropTypes.oneOf(["top", "right", "bottom", "left"]).isRequired,
  drawerWidth: PropTypes.number.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  drawerFixed: PropTypes.bool,
}

Drawer.propTypes = {
  anchor: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  elevation: PropTypes.oneOf([1, 2, 3, 4]),
  fixed: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  rounded: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
  style: PropTypes.object,
  overlayStyle: PropTypes.object,
  children: PropTypes.node,
}

export default Drawer
