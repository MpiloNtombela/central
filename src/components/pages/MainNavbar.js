import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React from 'react';
import {FaSignOutAlt} from "react-icons/fa";
import {useMediaQuery} from "react-responsive";
import {useDataContext} from "../../hooks/context";
import {stringToColor} from "../../utils/colors";
import IconText from "../elements/IconText";
import Image from "../elements/Image";
import Navbar, {NavbarItem, NavbarItems, NavbarLink} from "../elements/Navbar";
import Text from "../elements/Text";
import Chip from "../layouts/Chip";
import Grid, {GridCell} from "../layouts/Grid";
import DropMenu, {Menu} from "../layouts/DropMenu";
import {achievements, admin, selfHelp} from "./utils/mainRoutes";
import Xe from "../../../public/Xe.png"

const NavRoute = ({route, isBreak}) => {
  return (
    <NavbarItem>
      <DropMenu frost>
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
  const {student} = useDataContext()
  return (
    <Navbar maxBreak={"sm"} logo={<Text fSize={"large"} tColor={"red"} fWeight={"bold"}>MPILO</Text>}
            elevation={4} navPosition="sticky-top">
      <NavbarItems>
        <NavRoute isBreak={isSm} route={selfHelp}/>
        <NavRoute isBreak={isSm} route={achievements}/>
        <NavRoute isBreak={isSm} route={admin}/>
        <NavbarItem>
          <Chip avatar={<Image radius={"50%"} isThumb src={Xe} alt={''}/>} text={student.studentNumber} bordered bgColor={'secondary'}/>
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