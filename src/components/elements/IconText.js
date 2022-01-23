import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { constrastColor } from '../../utils/colors';

const StyledIconTextCont = styled.div(
    ({ onClick, textFisrt, stack }) => `
    display: flex;
    flex-direction: ${stack ? 'column' : 'row'};
    justify-content: center;
    align-items: center;
    cursor: ${onClick ? 'pointer' : 'inherit'}
  `
)

const StyledIconCont = styled.div(({ theme, rounded, outlined, shadow, bgColor }) => `
  background: ${bgColor && !outlined ? bgColor : 'transparent'};
  border-radius: ${rounded && bgColor ? "50%" : theme.sizes.radius.sm};
  border: ${outlined ? `2px solid ${bgColor}` : 0};
  padding: ${bgColor ? theme.sizes.gutters[1] : 0};
  box-shadow: ${shadow ? '0px 0px 7px' : 'none'};
  color: ${outlined ? bgColor : bgColor ? constrastColor(bgColor).color : "inherit"}
`)

const StyledIconText = styled.span(({ theme, textSize }) => `
  font-size: ${textSize};
  white-space: nowrap;
  color: ${theme.color.main}
`)

const IconText = ({ icon, text, outlined, bgColor, rounded, style, shadow, onClick, textFisrt, stack, textSize = "small" }) => {
    return (
        <StyledIconTextCont textFisrt={ textFisrt } stack={ stack } onClick={ onClick }>
            <StyledIconCont style={ style } rounded={ rounded } outlined={ outlined } shadow={ shadow } bgColor={ bgColor }>{ icon }</StyledIconCont>
            <StyledIconText textSize={ textSize }>{ text }</StyledIconText>
        </StyledIconTextCont>
    )
}

IconText.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    outlined: PropTypes.bool,
    stack: PropTypes.bool,
    textFisrt: PropTypes.bool,
    bgColor: PropTypes.string,
    rounded: PropTypes.bool,
    shadow: PropTypes.bool,
    onClick: PropTypes.func,
    textSize: PropTypes.string,
};

export default IconText;
