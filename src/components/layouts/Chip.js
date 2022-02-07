import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';

const StyledAvatar = styled.div`
  max-height: 2rem;
  max-width: 2rem;
  aspect-ratio: 1/1;
  margin-right: ${({theme}) => theme.sizes.gutters[1]};
  margin-left: ${({theme}) => `-${theme.sizes.gutters[2]}`};
  box-sizing: border-box;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: ${({theme}) => theme.sizes.gutters[1]};
`

const StyledText = styled.span`
  font-weight: 500;
`

const StyledChip = styled.div`
  display: inline-flex;
  padding: ${({theme}) => `calc(${theme.sizes.gutters[1]} - 2px) calc(${theme.sizes.gutters[3]} - 2px)`};
  border-radius: ${({theme, rounded}) => rounded ? '9999rem' : theme.sizes.radius.sm};
  background: ${({
                   theme,
                   bgColor,
                   bordered
                 }) => bordered ? 'transparent'
          : bgColor === "main" ? theme.color.secondary
                  : theme.palette[bgColor].main};
  color: ${({
              theme,
              bgColor,
              bordered
            }) => bordered ? bgColor === "main" ? theme.color.secondary
          : theme.palette[bgColor]?.main
          : theme.palette[bgColor]?.contrastText};
  border: 2px solid ${({theme, bordered, bgColor}) => bordered ? bgColor === "main" ? theme.color.secondary
          : theme.palette[bgColor]?.main
          : 'transparent'};
  align-items: center;
  justify-content: center;
  width: fit-content;

  ${StyledText} {
    font-size: ${({textSize, avatar}) => textSize ? textSize : avatar ? '1rem' : '.75rem'};
  }

  ${StyledAvatar} {
    border-radius: ${({theme, rounded}) => rounded ? '50%' : theme.sizes.radius.sm};
    background: ${({theme, bgColor}) => bgColor === "main" ? theme.background.secondary
            : theme.palette[bgColor].dark};
  }
`
const Chip = ({avatar, text, bgColor = "main", textSize, bordered, rounded = true}) => {
  return (
    <StyledChip avatar={avatar}
                textSize={textSize}
                rounded={rounded}
                bordered={bordered}
                bgColor={bgColor}>
      {avatar && <StyledAvatar>
        {avatar}
      </StyledAvatar>}
      <StyledText>{text}</StyledText>
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
}

export default Chip;