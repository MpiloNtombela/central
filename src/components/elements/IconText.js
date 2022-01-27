import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {contrastColor} from '../../utils/colors';

const StyledIconTextCont = styled.div(
  ({onClick, textFirst, stack, justify, align}) => `
    display: flex;
    flex-direction: ${stack ? textFirst ? 'column-reverse' : 'column' : textFirst ? 'row-reverse' : 'row'};
    justify-content: ${justify};
    align-items: ${align};
    cursor: ${onClick ? 'pointer' : 'inherit'}
  `
)

const StyledIconCont = styled.div(({theme, rounded, outlined, shadow, bgColor}) => `
  background: ${bgColor && !outlined ? bgColor : 'transparent'};
  border-radius: ${rounded && bgColor ? "50%" : theme.sizes.radius.sm};
  border: ${outlined ? `2px solid ${bgColor}` : 0};
  padding: ${bgColor ? theme.sizes.gutters[1] : 0};
  box-shadow: ${shadow ? '0px 0px 7px' : 'none'};
  color: ${outlined ? bgColor : bgColor ? contrastColor(bgColor).color : "inherit"}
`)

const StyledIconText = styled.span(({theme, textSize}) => `
  font-size: ${textSize};
  white-space: nowrap;
  color: ${theme.color.main}
`)

const IconText = ({
                    icon,
                    text,
                    outlined,
                    bgColor,
                    rounded,
                    iconStyle,
                    textStyle,
                    shadow,
                    onClick,
                    textFirst,
                    stack,
                    justify,
                    align,
                    textSize = "small"
                  }) => {
  return (
    <StyledIconTextCont textFirst={textFirst} stack={stack} justify={justify} align={align} onClick={onClick}>
      <StyledIconCont
        style={iconStyle}
        rounded={rounded}
        outlined={outlined}
        shadow={shadow}
        bgColor={bgColor}>
        {icon}
      </StyledIconCont>
      <StyledIconText textSize={textSize} style={textStyle}>{text}</StyledIconText>
    </StyledIconTextCont>
  )
}

IconText.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  outlined: PropTypes.bool,
  stack: PropTypes.bool,
  justify: PropTypes.string,
  align: PropTypes.string,
  textFirst: PropTypes.bool,
  bgColor: PropTypes.string,
  rounded: PropTypes.bool,
  shadow: PropTypes.bool,
  onClick: PropTypes.func,
  textSize: PropTypes.string,
  iconStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default IconText;
