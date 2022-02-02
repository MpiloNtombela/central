import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React from 'react';
import {FaSignOutAlt} from "react-icons/fa";
import {useMediaQuery} from "react-responsive";
import {stringToColor} from "../../utils/colors";
import IconText from "../elements/IconText";
import Navbar, {NavbarItem, NavbarItems, NavbarLink} from "../elements/Navbar";
import Text from "../elements/Text";
import Grid, {GridCell} from "../layouts/Grid";
import DropMenu, {Menu} from "../layouts/DropMenu";
import {achievements, admin, selfHelp} from "./utils/mainRoutes";

const NavRoute = ({route, isBreak}) => {
  return (
    <NavbarItem style={{margin: `0 1rem`}}>
      <DropMenu frost>
        <IconText stack={!isBreak} align={'center'} text={route.name} icon={route.icon} textSize={"small"}/>
        <Menu>
          <Grid gridSpacing={2}>
            {route.subRoutes.map((r, i) => {
              const {hex} = stringToColor(r.name);
              return (
                <GridCell key={i} colsSm={4}>
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
                        alignItems: "center"
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
  const isSm = useMediaQuery({ maxWidth: theme.breakpoints.sm })
  return (
    <Navbar maxBreak={"sm"} logo={<Text fSize={"large"} tColor={"red"} fWeight={"bold"}>MPILO</Text>}
            elevation={1}>
      <NavbarItems>
        <NavRoute isBreak={isSm} route={selfHelp}/>
        <NavRoute isBreak={isSm} route={achievements}/>
        <NavRoute isBreak={isSm} route={admin}/>
        <NavbarItem style={{margin: `0 1rem`}}>
          <IconText
            stack={!isSm} textStyle={{color: 'red'}} icon={<FaSignOutAlt color={'red'} size={28}/>} text={"logout"}
            textSize='.75rem'/>
        </NavbarItem>
      </NavbarItems>
    </Navbar>
  );
};

NavRoute.propTypes = {
  route: PropTypes.object,
  isBreak: PropTypes.bool,
}

export default MainNavbar;