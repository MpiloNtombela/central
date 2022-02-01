import PropTypes from "prop-types";
import React from 'react';
import {NavLink} from "react-router-dom";
import {stringToColor} from "../../utils/colors";
import IconText from "../elements/IconText";
import Navbar, {NavbarLink, NavbarLinks} from "../elements/Navbar";
import Text from "../elements/Text";
import Grid, {GridCell} from "../layouts/Grid";
import HoverMenu from "../layouts/HoverMenu";
import {selfHelp} from "./utils/mainRoutes";

const NavRoute = ({route}) => {
  return (
    <NavbarLink to={"/"}>
      <HoverMenu frost>
        <IconText text={route.name} icon={route.icon}/>
        <div className='menu'>
          <Grid gridSpacing={ 2 }>
            {route.subRoutes.map((r, i) => {
              const {hex} = stringToColor(r.name);
              return (
                <GridCell key={i} colsSm={4}>
                  <NavLink to={r.path}>
                    <IconText
                      stack
                      icon={r.icon}
                      text={r.name}
                      textSize='x-small'
                      bgColor={hex}
                      align={'center'}
                      iconStyle={{
                        height: "36px",
                        width: "36px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}/>
                  </NavLink>
                </GridCell>
              )
            })}
          </Grid>
        </div>
      </HoverMenu>
    </NavbarLink>
  )
}

const MainNavbar = () => {
  return (
    <Navbar maxBreak={"sm"} logo={<Text fSize={"large"} tColor={"red"} fWeight={"bold"}>MPILO</Text>}
            elevation={1}>
      <NavbarLinks>
        <NavRoute route={selfHelp}/>
      </NavbarLinks>
    </Navbar>
  );
};

NavRoute.propTypes = {
  route: PropTypes.object,
}

export default MainNavbar;