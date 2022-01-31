import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import {NavLink} from "react-router-dom";

/**
 * @description height of the navbar (assumes using 'rem' size)
 */
export const NAV_HEIGHT = 3.25;


const Brand = styled.div`
  margin-right: ${props => props.theme.sizes.gutters[2]};
`

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0 ${({theme}) => theme.sizes.gutters[2]};
  font-weight: 500;

  &.active {
    color: ${props => props.theme.palette.primary.main} !important;
  }
`

export const NavbarLinks = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  .active-parent {
    color: ${props => props.theme.palette.secondary.main}
  }
`

const StyledNavbar = styled.nav`
  display: flex;
  position: ${({navStyle}) => navStyle ? navStyle : 'static'};
  background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
  color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${props => props.navElevation});
  min-height: ${NAV_HEIGHT}rem;
  max-height: ${NAV_HEIGHT}rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  width: 100%;
  z-index: ${props => props.theme.sizes.zIndex.nav};
  align-items: center;
  transition: all .5s ease-in-out;
  overflow: hidden;

  ${StyledNavLink} {
    color: inherit;
  }

  @media (max-width: ${({maxBreak, theme}) => maxBreak ? theme.breakpoints[maxBreak] : 0}px) {
    flex-direction: column;
    align-items: normal;
    max-height: ${({open}) => open ? `70vh` : `${NAV_HEIGHT}rem`};
    ${NavbarLinks} {
      flex-direction: column;
      display: ${({open}) => open ? `flex` : 'none'};
    }

    ${StyledNavLink} {
      margin: 0;
      padding: ${({theme}) => theme.sizes.gutters[2]};
      border-radius: ${props => props.theme.sizes.radius.sm};
      transition: padding-left .5s ease;

      &:hover:not(.active) {
        position: relative;
        transition: all .25s ease-in-out;
        padding-left: ${({theme}) => theme.sizes.gutters[3]};

        &:not(.active)::before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-left: .5rem solid ${({theme}) => theme.palette.primary.main};
          border-top: .5rem solid transparent;
          border-bottom: .5rem solid transparent;
          transform: translateX(-135%);
        }
      }

      &.active {
        background: ${props => props.theme.palette.primary.main};
        color: ${props => props.theme.palette.primary.contrastText} !important;
        mix-blend-mode: normal;
      }
    }

  ;
    ${Brand} {
      min-height: ${NAV_HEIGHT}rem;
      max-height: ${NAV_HEIGHT}rem;
      display: flex;
      align-items: center;
    }
  }

`

const Navbar = ({logo, maxBreak = "sm", elevation = 0, children}) => {
  return (
    <StyledNavbar navElevation={elevation} open={true} maxBreak={maxBreak}>
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
  logo: PropTypes.node,
  maxBreak: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl", false])
}

export default Navbar;