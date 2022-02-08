import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledImage = styled.img`
  border-radius: ${props => props.radius || props.theme.sizes.radius.sm};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  background: ${props => props.isThumb ? props.theme.background.secondary : 'none'};
  padding: ${props => props.isThumb || props.bordered ? props.theme.sizes.gutters[1] : 0};
  border: ${props => props.bordered ?
          `2px solid ${props.borderColor ? props.borderColor
                  : props.theme.color.secondary}` : 'none'};
  aspect-ratio: ${props => props.radius === '50%' ? `1/1` : 'auto'};
  box-sizing: border-box;
`;

const Image = ({alt, height, radius, src, width, isThumb, bordered, borderColor, style}) => {
  return (
    <StyledImage src={src} alt={alt}
                 width={width} height={height}
                 radius={radius}
                 isThumb={isThumb} bordered={bordered}
                 borderColor={borderColor}
                 style={style}/>
  );
};

// add propTypes
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  radius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isThumb: PropTypes.bool,
  bordered: PropTypes.bool,
  borderColor: PropTypes.string,
  style: PropTypes.object,
};

export default Image;