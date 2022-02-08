import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';

const StyledAvatar = styled.div`
  max-height: 1.75rem;
  max-width: 1.75rem;
  aspect-ratio: 1/1;
  margin-right: ${({theme}) => theme.sizes.gutters[1]};
  margin-left: ${({theme}) => `-${theme.sizes.gutters[2]}`};
  box-sizing: border-box;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

const StyledText = styled.span`
  font-weight: 400;
`

const StyledEndIcon = styled.span`
  margin-left: ${({theme}) => theme.sizes.gutters[2]};

  &:hover {
    cursor: ${({onClick}) => onClick ? 'pointer' : 'default'};
  }
`

const StyledChip = styled.div`
  display: inline-flex;
  padding: ${({theme}) => `calc(${theme.sizes.gutters[1]} - 1px) calc(${theme.sizes.gutters[3]} - 1px)`};
  border-radius: ${({theme, rounded}) => rounded ? '9999rem' : theme.sizes.radius.sm};
  background: ${({
                   theme,
                   bgColor,
                   bordered
                 }) => bordered ? 'transparent'
          : bgColor === "main" ? theme.background.main
                  : theme.palette[bgColor].main};
  color: ${({
              theme,
              bgColor,
              bordered
            }) => bordered ? bgColor === "main" ? theme.color.main
          : theme.palette[bgColor]?.main
          : theme.palette[bgColor]?.contrastText};
  border: 1px solid ${({theme, bordered, bgColor}) => bordered ? bgColor === "main" ? theme.background.main
          : theme.palette[bgColor]?.main
          : 'transparent'};
  align-items: center;
  justify-content: center;
  width: fit-content;

  ${StyledText} {
    font-size: ${({textSize, avatar}) => textSize ? textSize : avatar ? '.9rem' : '.75rem'};
  }

  ${StyledAvatar} {
    border-radius: ${({theme, rounded}) => rounded ? '50%' : theme.sizes.radius.sm};
  }

  ${StyledEndIcon} {
    color: ${({
                theme,
                bgColor,
              }) => bgColor === "main" ? theme.color.secondary : theme.palette[bgColor]?.dark};

    &:hover {
      cursor: ${({onClick}) => onClick ? 'pointer' : 'default'};
    }
  }

  &:hover {
    cursor: ${({onClick}) => onClick ? 'pointer' : 'default'};
    color: ${({onClick, theme, bgColor}) => onClick ? theme.palette[bgColor]?.contrastText : ''};
    background: ${({
                     onClick,
                     theme,
                     bgColor,
                     bordered
                   }) => onClick ? bgColor === "main" ? bordered ? theme.background.glass
            : theme.background.main
            : bordered ? theme.palette[bgColor].glass : theme.palette[bgColor].light : ''};
  }
`

const Chip = ({
                avatar,
                text,
                endIcon,
                onEndIconClick,
                onClick,
                bgColor = "main",
                textSize,
                bordered,
                rounded = true
              }) => {

  return (
    <StyledChip avatar={avatar}
                textSize={textSize}
                rounded={rounded}
                bordered={bordered}
                bgColor={bgColor}
                onClick={onClick}>
      {avatar && <StyledAvatar>
        {avatar}
      </StyledAvatar>}
      <StyledText>{text}</StyledText>
      {endIcon && <StyledEndIcon onClick={onEndIconClick}>{endIcon}</StyledEndIcon>}
    </StyledChip>
  );
};

Chip.propTypes = {
  bgColor: PropTypes.oneOf(["main", "primary", "secondary", "success", "warning", "danger", "info"]),
  rounded: PropTypes.bool,
  text: PropTypes.node,
  avatar: PropTypes.node,
  textSize: PropTypes.string,
  bordered: PropTypes.bool,
  endIcon: PropTypes.node,
  onEndIconClick: PropTypes.func,
  onClick: PropTypes.func,
}

export default Chip;