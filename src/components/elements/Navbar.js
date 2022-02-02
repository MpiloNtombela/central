import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

/**
 * @description height of the navbar (assumes using 'rem' size)
 */
export const NAV_HEIGHT = 3.25;


const StyledBrand = styled.div`
  margin-right: ${props => props.theme.sizes.gutters[2]};
  position: relative;
  background: inherit;
  padding: 0 ${({theme}) => theme.sizes.gutters[2]};
`
const StyleNavbarIcon = styled.div`
  display: none;
  align-items: center;
  min-height: ${NAV_HEIGHT}rem;
  max-height: ${NAV_HEIGHT}rem;
  background: inherit;
  padding: 0 ${({theme}) => theme.sizes.gutters[2]};

  &:hover {
    cursor: pointer;
  }
`

const StyledExtraContent = styled.div`
  background: inherit;
`

export const NavbarLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 500;

  &.active {
    color: ${props => props.theme.palette.primary.main} !important;
  }
`

export const NavbarItem = styled.div`
  background: inherit;
  color: inherit;
  margin: 0 ${({theme}) => theme.sizes.gutters[3]};

`

export const NavbarItems = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-height: fit-content;
  transition: all .5s ease-in-out;

  .active-parent {
    color: ${props => props.theme.palette.secondary.main}
  }
`

const StyledNavbarContent = styled.div`
  display: flex;
  position: ${({navStyle}) => navStyle ? navStyle : 'static'};
  background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
  color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
  min-height: ${NAV_HEIGHT}rem;
  max-height: ${NAV_HEIGHT}rem;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  overflow: hidden;

  ${NavbarLink} {
    color: inherit;
  }
`

const StyledNavbar = styled.nav`
  display: flex;
  position: relative;
  background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
  color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${props => props.navElevation});
  z-index: ${props => props.theme.sizes.zIndex.nav};

  @media (max-width: ${({maxBreak, theme}) => maxBreak ? theme.breakpoints[maxBreak] : 0}px) {
    ${StyledNavbarContent} {
      flex-direction: column;
      align-items: normal;
    }

    ${NavbarItems} {
      flex-direction: column;
      position: absolute;
      top: ${({open}) => open ? `${NAV_HEIGHT}rem` : '-450%'};
      left: 0;
      right: 0;
      background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
      color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
      padding: ${({theme}) => theme.sizes.gutters[2]};
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, ${props => (props.navElevation / 2 / 10)});
      z-index: -1;
    }

    ${NavbarLink} {
      border-radius: ${props => props.theme.sizes.radius.sm};

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

    ${StyledBrand} {
      min-height: ${NAV_HEIGHT}rem;
      max-height: ${NAV_HEIGHT}rem;
      display: flex;
      align-items: center;
    }

    ${StyleNavbarIcon} {
      display: ${props => props.maxBreak ? 'flex' : 'none'};
    }
  }

`

const Navbar = ({
                  logo = "BRAND",
                  maxBreak = "sm",
                  elevation = 0,
                  openIcon = "MENU",
                  closeIcon = "CLOSE",
                  extraContentElem,
                  style,
                  brandStyle,
                  brandClass,
                  children
                }) => {
  const [open, setOpen] = useState(false)

  return (
    <StyledNavbar navElevation={elevation} style={style} maxBreak={maxBreak} open={open}>
      <StyledNavbarContent navElevation={elevation} open={open}>
        <StyledBrand style={brandStyle} className={brandClass}>
          {logo}
        </StyledBrand>
        {children}
      </StyledNavbarContent>
      <StyledExtraContent>
        {extraContentElem}
      </StyledExtraContent>
      <StyleNavbarIcon onClick={() => setOpen(!open)}>
        {open ? closeIcon : openIcon}
      </StyleNavbarIcon>
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  logo: PropTypes.node,
  maxBreak: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl", false]),
  style: PropTypes.object,
  brandStyle: PropTypes.object,
  brandClass: PropTypes.string,
  extraContentElem: PropTypes.element,
  closeIcon: PropTypes.node,
  openIcon: PropTypes.node,
}

export default Navbar;