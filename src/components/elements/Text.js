import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'

// basic text component
const StyledText = styled.p((props) => `
    font-weight: ${props.fWeight};
    font-size: ${props.fSize};
    display: ${props.dInline ? "inline-block" : "block"};
    color: ${props.tColor ? props.tColor : props.theme.color.main};
    text-align: ${props.tAlign ? props.tAlign : 'start'};
    margin: 0;
`)

const Text = ({tColor, tAlign, dInline, style, fWeight = "normal", fSize ="medium", children }) => {
    return (
        <StyledText
            fWeight={ fWeight }
            fSize={ fSize }
            tColor={ tColor }
            dInline={ dInline }
            tAlign={ tAlign }
            style={ style }>
            { children }
        </StyledText>
    )
}

Text.propTypes = {
    fWeight: PropTypes.string,
    fSize: PropTypes.string,
    tColor: PropTypes.string,
    dInline: PropTypes.bool,
    style: PropTypes.object,
    tAlign: PropTypes.string,
}

export default Text
