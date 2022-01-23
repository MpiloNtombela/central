import styled from "@emotion/styled";
import React from "react";


const FooterContainer = styled.div`
  height: 15rem;
  width: 100%;
  position: relative;
`
const StyledFooter = styled.footer(
  ({ theme }) => `

  background: ${theme.palette.primary.dark};
  position: absolute;
  color: ${theme.palette.primary.contrastText};
  min-height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', 'Helvetica', sans-serif;
  bottom: 0;
`
);

const Cap = styled.div(
  ({ theme }) => `
  background: linear-gradient(to top, ${theme.palette.primary.dark}, ${theme.palette.secondary.light});
  height: 5rem;
  width: 100%;
  position: absolute;
  transform: skewY(0deg);
  top: 0;
`
);

const Footer = () => {
  const data = new Date();
  return (
    <FooterContainer>
      <Cap />
      <StyledFooter>
        <p>&copy; Boys and Bugs {data.getFullYear()}</p>
      </StyledFooter>
    </FooterContainer>
  );
};

export default Footer;
