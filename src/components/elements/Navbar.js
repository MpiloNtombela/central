import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import {NavLink} from "react-router-dom";

/**
 * @description height of the top navbar (assumes using 'rem' size)
 */
export const NAV_HEIGHT = 3.25;

const StyledNavbar = styled.nav`
  position: ${({navStyle}) => navStyle ? navStyle : 'static'};
  top: 0;
  background: ${props => props.theme.background.main};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${props => props.navElevation});
  height: ${NAV_HEIGHT}rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  width: 100%;
  z-index: ${props => props.theme.sizes.zIndex.nav};
`

const Brand = styled.div`
  margin-right: ${props => props.theme.sizes.gutters[2]};
`

export const NavbarLinks = styled.div`
  flex: 1;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .15);
  height: ${NAV_HEIGHT - .5}rem;
  width: 100%;
  padding: ${props => props.theme.shape.gutters[1]};
  padding-top: 0;

  .active-parent {
    color: ${props => props.theme.palette.secondary.main}
  }
`
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.color.secondary};

  &.active [class*="icon-"] {
    color: ${props => props.theme.palette.secondary.main} !important;
    mix-blend-mode: multiply;
  }
`

const Navbar = ({logo, elevation = 0, children}) => {
  return (
    <StyledNavbar navElevation={elevation}>
      <Brand>
        {logo}
      </Brand>
      {children}
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  logo: PropTypes.node
}

export default Navbar;