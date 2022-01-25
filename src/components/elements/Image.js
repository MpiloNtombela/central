import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
// create a styled image component that accepts src, alt, and different sizes and radius with thumbnail as default size
const StyledImage = styled.img`
  border-radius: ${props => props.radius || props.theme.sizes.radius.sm};
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
`;  // end of Image component

const Image = ({alt, height, radius, src, width}) => {
  return (
    <StyledImage src={ src } alt={ alt } width={width} height={ height } radius={ radius } />
  );
};

// add propTypes
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  radius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Image;