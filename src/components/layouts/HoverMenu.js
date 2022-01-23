import styled from '@emotion/styled'
import PropTypes from "prop-types";
import React from 'react'
export const StyledHoverMenu = styled.div(({ theme, frost }) => `
    cursor: pointer;
    .menu {
        position: absolute;
        visibility: hidden;
        background: ${frost ? theme.background.glass : theme.background.secondary};
        min-width: 250px;
        // min-height: 75px;
        color: ${theme.color.main};
        border-radius: ${theme.sizes.radius.lg};
        box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .15);
        padding: ${theme.sizes.gutters[2]};
        margin-top: ${theme.sizes.gutters[2]};
        opacity: 0;
        transition: all .5s ease-in-out;
        backdrop-filter: ${frost ? 'blur(3px)' : 'none'};
        &::before{
            content: '';
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            transform: translate(-50%, -50%)
        }
    }
    .arrow-cont {
        position: relative;

    }
    .arrow-up {
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 0;
        border-left: .5rem solid transparent;
        border-right: .5rem solid transparent;
        border-bottom: .5rem solid ${frost ? theme.background.glass : theme.background.secondary};
        transform: translateX(-50%);
        opacity: 0;
        visibility: hidden;
        transition: all .5s ease-in-out;
    }
    &:hover .menu, &:hover .arrow-up {
        visibility: visible;
        opacity: 1;
    }

`)
const HoverMenu = ({ frost, children }) => {
    const handleOver = (e) => {
        const menu = e.currentTarget.querySelector(".menu");
        if (menu.getBoundingClientRect().right > window.innerWidth) {
            menu.style.right = 0;
        } else if (menu.getBoundingClientRect().right < window.innerWidth) {
            setTimeout(() => {
                menu.style.right = "inherit"
            }, 500);
        }
    }

    return (
        <StyledHoverMenu frost={ frost } onMouseOver={ handleOver }>
            { children }
            <div className='arrow-cont'>
                <div className='arrow-up' />
            </div>
        </StyledHoverMenu>
    )
}

HoverMenu.propTypes = {
    frost: PropTypes.bool,
    children: PropTypes.node,
}

export default HoverMenu
