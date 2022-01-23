import React from "react";
import { css, keyframes } from '@emotion/react'

const loaderAnim = keyframes`
    0% {
        height: 5px;
        transform: translateY(0px);
    }
    25% {
        height: 30px;
        transform: translateY(15px);
    }
    50% {
        height: 5px;
        transform: translateY(0px);
    }
    100% {
        height: 5px;
        transform: translateY(0px);
    }
`

const styledLoader = (theme) => css`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50px;
    width: 50px;
    margin: -25px 0 0 -25px;
    transform: translate(-50%, -50%);
    span {
        position: absolute;
        display: block;
        bottom: 10px;
        width: 9px;
        height: 5px;
        background: ${theme.palette.secondary.light};
        animation: ${loaderAnim} 1.5s  infinite ease-in-out;
        &:nth-of-type(1) {
            left: 11px;
            animation-delay: 0.2s;
        };
        &:nth-of-type(2) {
            left: 22px;
            animation-delay: 0.4s;
        };
        &:nth-of-type(3) {
            left: 33px;
            animation-delay: 0.6s;
        };
        &:nth-of-type(4) {
            left: 44px;
            animation-delay: 0.8s;
        };
        &:nth-of-type(5) {
            left: 55px;
            animation-delay: 1s;
        };
    };
`

const Loader = () => {
    return (
        <div css={styledLoader}>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
        </div>
    )
}

export default Loader
