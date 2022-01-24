import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const DrawerContainer = styled.div(({drawerAnchor, drawerOpen, drawerWidth}) => `
    width: 100%;
    height: 100%;
    padding-left: ${drawerAnchor === 'left' && drawerOpen ? `${drawerWidth}px` : 0};
    padding-right: ${drawerAnchor === 'right' && drawerOpen ? `${drawerWidth}px` : 0};
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
const StyledDrawer = styled.div(({theme, anchor, open, width, height, fixed, elevation, rounded}) => `
    position: ${fixed ? 'fixed' : 'absolute'};
    left: ${anchor !== 'right' ? open ? '0' : anchor !== "left" ? "0" : '-100%' : 'unset'};
    right: ${anchor !== 'left' ? open ? '0' : anchor !== "right" ? "0" : '-100%' : 'unset'};
    top: ${anchor !== 'bottom' ? open ? '0' : anchor !== "top" ? "0" : '-100%' : 'unset'};
    bottom: ${anchor !== 'top' ? open ? '0' : anchor !== "bottom" ? "0" : '-100%' : 'unset'};
    box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .${elevation});
    border-top-right-radius: ${anchor === 'bottom' && rounded ? '1.25rem' : 0};
    border-top-left-radius:  ${anchor === 'bottom' && rounded ? '1.25rem' : 0};
    max-width: ${width ? width : anchor === 'left' || anchor === 'right' ? '315px' : `100%`};
    pointer-events: auto;
    box-sizing: border-box;
    width: ${anchor === 'top' || anchor === 'bottom' ? '100%' : width ? `${width}px` : 'auto'};
    height: ${anchor === 'left' || anchor === 'right' ? '100%' : height ? `${height}px` : 'auto'};
    background: ${theme.background.main};
    transition: all .5s ease-in-out;
`)

const Drawer = ({open, fixed, width, height, rounded, onClose, elevation = 0, anchor = "left", children}) => {

  const handleClick = (e) => {
    if (fixed) return;
    const cont = e.currentTarget;
    const drawer = cont.querySelector('.jsx-drawer')
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
      width={width}
      height={height}>
      <StyledDrawer
        className='jsx-drawer'
        fixed={fixed}
        open={open}
        anchor={anchor}
        width={width}
        height={height}
        rounded={rounded}
        elevation={elevation}>
        {children}
      </StyledDrawer>
    </StyledDrawerOverlay>
  )
}

DrawerContainer.propTypes = {
  drawerAnchor: PropTypes.oneOf(["top", "right", "bottom", "left"]).isRequired,
  drawerWidth: PropTypes.number.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
}

Drawer.propTypes = {
  anchor: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  elevation: PropTypes.oneOf([1, 2, 3, 4]),
  fixed: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  rounded: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Drawer
