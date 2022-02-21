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
    ${props => {
      const {activeCss} = props;
      return activeCss;
    }}
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
`

const StyledNavbarContent = styled.div`
  display: flex;
  position: ${({navStyle}) => navStyle ? navStyle : 'static'};
  color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
  min-height: ${NAV_HEIGHT}rem;
  max-height: ${NAV_HEIGHT}rem;
  box-sizing: border-box;
  width: 100%;
  align-items: center;

  ${NavbarLink} {
    color: inherit;
  }
`

const StyledNavbarContainer = styled.div`
  display: flex;
  margin: 0 auto;

`

const StyledNavbar = styled.nav`
  position: ${({navPosition}) => navPosition === "fixed-top" ? "fixed" : navPosition === "sticky-top" ? "sticky" : "relative"};
  background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
  color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0,.${props => props.navElevation});
  z-index: ${props => props.theme.sizes.zIndex.nav};
  top: ${({navPosition}) => (navPosition === "fixed-top" || navPosition === "sticky-top") && 0};
  left: ${({navPosition}) => (navPosition === "fixed-top" || navPosition === "sticky-top") && 0};
  right: ${({navPosition}) => (navPosition === "fixed-top" || navPosition === "sticky-top") && 0};

  ${StyledNavbarContainer} {
    max-width: ${({theme, maxWidth}) => maxWidth ? `${theme.breakpoints[maxWidth]}px}` : '100%'};

    ${StyledNavbarContent} {
      background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
    }

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
        background: inherit;
        color: ${({textColor, theme}) => textColor ? textColor : theme.color.secondary};
        padding: ${({theme}) => theme.sizes.gutters[2]};
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, ${props => (props.navElevation / 2 / 10)});
        z-index: -1;
      }

      ${NavbarItem} {
        margin: 0;
        padding: ${({theme}) => theme.sizes.gutters[2]};
      }

      ${NavbarLink} {
        border-radius: ${props => props.theme.sizes.radius.sm};

        &.active {
          background: ${props => props.theme.palette.primary.main};
          color: ${props => props.theme.palette.primary.contrastText} !important;
          mix-blend-mode: normal;
          ${props => {
            const {activeCss} = props;
            return activeCss;
          }}
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
        background: ${({bgColor, theme}) => bgColor ? bgColor : theme.background.main};
      }
    }
  }

`

const Navbar = ({
                  extraContentElem,
                  navPosition,
                  style,
                  brandStyle,
                  brandClass,
                  logo = "BRAND",
                  maxBreak = "sm",
                  elevation = 0,
                  openIcon = "MENU",
                  closeIcon = "CLOSE",
                  maxWidth = false,
                  bgColor,
                  children
                }) => {
  const [open, setOpen] = useState(false)

  return (
    <StyledNavbar navPosition={navPosition}
                  navElevation={elevation}
                  style={style}
                  bgColor={bgColor}
                  maxBreak={maxBreak}
                  open={open}
                  maxWidth={maxWidth}>
      <StyledNavbarContainer>
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
      </StyledNavbarContainer>
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  logo: PropTypes.node,
  maxBreak: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl", false]),
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", false]),
  style: PropTypes.object,
  brandStyle: PropTypes.object,
  brandClass: PropTypes.string,
  extraContentElem: PropTypes.element,
  navPosition: PropTypes.oneOf(["fixed-top", "sticky-top"]),
  closeIcon: PropTypes.node,
  bgColor: PropTypes.string,
  openIcon: PropTypes.node,
}

export default Navbar;