import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const PaperStyled = styled.div(
  ({theme}) => `
  color: ${theme.color.main};
  background: ${theme.background.main}
`
);

const Paper = ({ children }) => {
  return <PaperStyled>{children}</PaperStyled>;
};

Paper.propTypes = {
  children: PropTypes.node,
};

export default Paper;
