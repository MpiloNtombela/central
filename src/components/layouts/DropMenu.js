import styled from '@emotion/styled'
import PropTypes from "prop-types";
import React from 'react'


const StyledMenu = styled.div`
  position: absolute;
  visibility: hidden;
  min-width: 200px;
  background: ${({theme}) => theme.background.secondary};
  color: ${({theme}) => theme.color.main};
  border-radius: ${({theme}) => theme.sizes.radius.md};
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .15);
  padding: ${({theme}) => theme.sizes.gutters[2]};
  margin-top: ${({theme}) => theme.sizes.gutters[2]};
  opacity: 0;
  transition: opacity .5s, visibility .5s ease-in-out;
  z-index: 1;
`

const StyledArrowUp = styled.div`
  position: absolute;
  width: 0;
  left: 50%;
  height: 0;
  border-left: .5rem solid transparent;
  border-right: .5rem solid transparent;
  border-bottom: .5rem solid ${({theme}) => theme.background.secondary};
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%);
  transition: opacity .5s, visibility .5s ease-in-out;
  z-index: 1;
`
const StyledDropMenu = styled.div`
  cursor: pointer;
  position: relative;
  width: fit-content;

  & .open-menu {
    visibility: visible;
    opacity: 1;;
  }

  ${StyledMenu} {
    background: ${({frost, theme}) => frost ? theme.background.glass : theme.background.secondary};
    backdrop-filter: ${({frost}) => frost ? 'blur(3px)' : 'none'};
  }

  ${StyledArrowUp} {
    border-bottom: .5rem solid ${({frost, theme}) => frost ? theme.background.glass : theme.background.secondary};
  }
`
const DropMenu = ({frost, children}) => {
  const handleClick = (e) => {
    const container = e.currentTarget
    const menu = container.querySelector(".menu");
    const arrow = container.querySelector(".arrow-up");
    if (menu !== e.target && !menu.contains(e.target)) {
      if ((window.innerWidth - e.pageX) < menu.getBoundingClientRect().width) {
        menu.style.right = '0%';
      } else {
        menu.style.right = 'unset';
      }
      menu.classList.add("open-menu")
      arrow.classList.add("open-menu")
    }
    document.body.addEventListener('click', (evt) => {
      if (container !== evt.target && !container.contains(evt.target)) {
        menu.classList.remove("open-menu")
        arrow.classList.remove("open-menu")
      }
    })
  }

  return (
    <StyledDropMenu frost={frost} onClick={handleClick}>
      {children}
      <StyledArrowUp className={"arrow-up"}/>
    </StyledDropMenu>
  )
}

export const Menu = ({children}) => {
  return (
    <StyledMenu className={"menu"}>
      {children}
    </StyledMenu>
  )
}

Menu.propTypes = {
  children: PropTypes.node,
}

DropMenu.propTypes = {
  frost: PropTypes.bool,
  children: PropTypes.node,
}

export default DropMenu
