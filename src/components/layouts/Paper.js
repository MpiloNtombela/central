import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const PaperStyled = styled.div(
  (props) => `
  color: ${props.theme.color.main};
  background: ${props.theme.background.main}
`
);

const Paper = ({ children }) => {
  return <PaperStyled>{children}</PaperStyled>;
};

Paper.propTypes = {
  children: PropTypes.node,
};

export default Paper;
