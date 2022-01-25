import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledImage = styled.img`
  border-radius: ${props => props.radius || props.theme.sizes.radius.sm};
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
  background: ${props => props.isThumb ? props.theme.background.secondary : 'none'};
  padding: ${props => props.isThumb ? props.theme.sizes.gutters[1] : 0};
  box-shadow: ${props => props.isThumb ? '0 0 5px 0 hsla(0, 0%, 10%, .2)' : 'none'};
`;

const Image = ({alt, height, radius, src, width, isThumb}) => {
  return (
    <StyledImage src={src} alt={alt} width={width} height={height} radius={radius} isThumb={isThumb}/>
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
};

export default Image;