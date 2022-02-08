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
                   color,
                   outlined
                 }) => outlined ? 'transparent'
          : color === "main" ? theme.background.main
                  : theme.palette[color].main};
  color: ${({
              theme,
              color,
              outlined
            }) => outlined ? color === "main" ? theme.color.main
          : theme.palette[color]?.main
          : theme.palette[color]?.contrastText};
  border: 1px solid ${({theme, outlined, color}) => outlined ? color === "main" ? theme.background.main
          : theme.palette[color]?.main
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
                color,
              }) => color === "main" ? theme.color.secondary : theme.palette[color]?.dark};

    &:hover {
      cursor: ${({onClick}) => onClick ? 'pointer' : 'default'};
    }
  }

  &:hover {
    cursor: ${({onClick}) => onClick ? 'pointer' : 'default'};
    color: ${({onClick, theme, color}) => onClick ? theme.palette[color]?.contrastText : ''};
    background: ${({
                     onClick,
                     theme,
                     color,
                     outlined
                   }) => onClick ? color === "main" ? outlined ? theme.background.glass
            : theme.background.main
            : outlined ? theme.palette[color].glass : theme.palette[color].light : ''};
  }
`

const Chip = ({
                avatar,
                text,
                endIcon,
                onEndIconClick,
                onClick,
                color = "main",
                textSize,
                outlined,
                rounded = true
              }) => {

  return (
    <StyledChip avatar={avatar}
                textSize={textSize}
                rounded={rounded}
                outlined={outlined}
                color={color}
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
  color: PropTypes.oneOf(["main", "primary", "secondary", "success", "warning", "danger", "info"]),
  rounded: PropTypes.bool,
  text: PropTypes.node,
  avatar: PropTypes.node,
  textSize: PropTypes.string,
  outlined: PropTypes.bool,
  endIcon: PropTypes.node,
  onEndIconClick: PropTypes.func,
  onClick: PropTypes.func,
}

export default Chip;