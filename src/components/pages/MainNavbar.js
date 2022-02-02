import PropTypes from "prop-types";
import React from 'react';
import {FaSignOutAlt} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {stringToColor} from "../../utils/colors";
import IconText from "../elements/IconText";
import Navbar, {NavbarItem, NavbarItems, NavbarLink} from "../elements/Navbar";
import Text from "../elements/Text";
import Grid, {GridCell} from "../layouts/Grid";
import HoverMenu from "../layouts/HoverMenu";
import {achievements, admin, selfHelp} from "./utils/mainRoutes";

const NavRoute = ({route}) => {
  return (
    <NavbarItem style={{margin: `0 1rem`}}>
      <HoverMenu frost>
        <IconText stack align={'center'} text={route.name} icon={route.icon} textSize={"small"}/>
        <div className='menu'>
          <Grid gridSpacing={ 2 }>
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
        </div>
      </HoverMenu>
    </NavbarItem>
  )
}

const MainNavbar = () => {
  return (
    <Navbar maxBreak={"sm"} logo={<Text fSize={"large"} tColor={"red"} fWeight={"bold"}>MPILO</Text>}
            elevation={1}>
      <NavbarItems>
        <NavRoute route={selfHelp}/>
        <NavRoute route={achievements}/>
        <NavRoute route={admin}/>
        <NavbarItem style={{margin: `0 1rem`}}>
          <IconText
            stack textStyle={{color: 'red'}} icon={<FaSignOutAlt color={'red'} size={28}/>} text={ "logout" } textSize='.75rem' />
        </NavbarItem>
      </NavbarItems>
    </Navbar>
  );
};

NavRoute.propTypes = {
  route: PropTypes.object,
}

export default MainNavbar;