import {useTheme} from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import {FaBars, FaSignOutAlt, FaTimes} from "react-icons/fa";
import {MdArrowDropDown} from "react-icons/md";
import {useMediaQuery} from "react-responsive";
import logo from "../../../public/logo.png"
import {useAuth} from "../../hooks/auth";
import {useDataContext} from "../../hooks/context";
import {stringToColor} from "../../utils/colors";
import IconText from "../elements/IconText";
import Image from "../elements/Image";
import Navbar, {NavbarItem, NavbarItems, NavbarLink} from "../elements/Navbar";
import Box from "../layouts/Box";
import Chip from "../layouts/Chip";
import DropMenu, {Menu} from "../layouts/DropMenu";
import Grid, {GridCell} from "../layouts/Grid";
import {achievements, admin, selfHelp} from "./utils/mainRoutes";


const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
`

const StyledWordMark = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  margin-left: .25rem;
  color: red
`

const MainLogo = () => (
  <StyledLogo>
    <Image height={'30'} src={logo} alt="logo"/>
    <StyledWordMark>Central</StyledWordMark>
  </StyledLogo>
)

const NavRoute = ({route, isBreak}) => {

  return (
    <NavbarItem>
      <DropMenu>
        <IconText stack={!isBreak} iconStyle={{marginRight: isBreak ? '.5rem' : '0'}} align={'center'}
                  text={route.name} icon={route.icon} textSize={isBreak ? '1rem' : "small"}/>
        <Menu>
          <Grid gridSpacing={3}>
            {route.subRoutes.map((r, i) => {
              const {hex} = stringToColor(r.name);
              const len = route.subRoutes.length
              return (
                <GridCell key={i} colsSm={len < 4 && len > 0 ? 12 / len : 4}>
                  <NavbarLink to={r.path} style={{margin: 0}}>
                    <IconText
                      stack
                      icon={r.icon}
                      text={r.name}
                      textSize='.75rem'
                      bgColor={hex}
                      align={'center'}
                      iconStyle={{
                        height: "36px",
                        width: "36px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}/>
                  </NavbarLink>
                </GridCell>
              )
            })}
          </Grid>
        </Menu>
      </DropMenu>
    </NavbarItem>
  )
}

const MainNavbar = () => {
  const theme = useTheme()
  const isSm = useMediaQuery({maxWidth: theme.breakpoints.sm})
  const {student: {studentNumber}} = useDataContext();
  const {removeUser} = useAuth()

  return (
    <Navbar maxBreak={"sm"} logo={<MainLogo/>}
            elevation={4} navPosition="sticky-top" maxWidth={'xl'} closeIcon={<FaTimes size={28}/>}
            openIcon={<FaBars size={28}/>}>
      {studentNumber && <NavbarItems>
        <NavRoute isBreak={isSm} route={selfHelp}/>
        <NavRoute isBreak={isSm} route={achievements}/>
        <NavRoute isBreak={isSm} route={admin}/>
        <NavbarItem style={{display: 'flex', alignItems: 'center'}}>
          <DropMenu>
            <Chip avatar={<Image radius={"50%"}
                                 style={{
                                   border: `1px solid ${theme.palette.secondary.main}`,
                                   padding: theme.sizes.gutters[1]
                                 }} src={logo} alt={''}/>}
                  text={studentNumber}
                  outlined color={'secondary'}
                  endIcon={<MdArrowDropDown size={'1rem'}/>}/>
            <Menu>
              <Box onClick={removeUser}
                   style={{background: theme.palette.danger.glass, borderRadius: theme.sizes.radius.sm}}>
                <IconText
                  icon={<FaSignOutAlt/>}
                  text={'logout'}
                  textSize='.75rem'
                  align={'center'}
                  iconStyle={{
                    height: "36px",
                    width: "36px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}/>
              </Box>
            </Menu>
          </DropMenu>
        </NavbarItem>
      </NavbarItems>}
    </Navbar>
  );
};

NavRoute.propTypes = {
  route: PropTypes.object,
  isBreak: PropTypes.bool,
}

export default MainNavbar;