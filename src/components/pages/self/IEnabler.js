import {useTheme} from "@emotion/react";
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useMediaQuery} from "react-responsive";
import {useImmer} from "use-immer";
import Xe from "../../../../public/Xe.png"
import {useDataContext, useDataDispatch} from "../../../hooks/context";
import {LOADED, LOADING} from "../../DataContext";
import Button from '../../elements/Button'
import IconText from "../../elements/IconText";
import Image from "../../elements/Image";
import Text from '../../elements/Text'
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from '../../layouts/Container'
import Drawer, {DrawerContainer} from '../../layouts/Drawer'
import Grid, {GridCell} from "../../layouts/Grid";
import iRoutes from "../utils/ienablerRoutes";
import IEnablerLoader from "./IEnablerLoader";

const caseOut = (str) => {
  const r = /([a-z])([A-Z])/g
  const s = str.replace(r, '$1 $2')
  return s.toUpperCase()
}

const KeyPairDetails = ({k, v}) => {
  return (
    <>
      <GridCell colsSm={6}>
        <Box margin={'.5rem 0'}>
          <Text fWeight={'bold'} fSize={'.85em'} tColor={"grey"}>{caseOut(k)}</Text>
        </Box>
      </GridCell>
      <GridCell colsSm={6}>
        <Box margin={'.5rem 0'}>
          <Text fSize={'.85em'}>{v}</Text>
        </Box>
      </GridCell>
    </>
  )
}

KeyPairDetails.propTypes = {
  k: PropTypes.string.isRequired,
  v: PropTypes.string.isRequired,
}

const SideNav = () => {
  const theme = useTheme()
  return (
    <Box position='relative' height='100%' paddingBottom='3rem' style={{boxSizing: 'border-box'}}>
      <Box height={'100%'} maxHeight={'100%'} style={{overflowY: 'auto'}}>
        {iRoutes.map((route, idx) => {
            if (route.subRoutes) {
              return (
                <Collapsible key={idx}
                             header={<IconText text={route.name} textSize={"medium"} icon={route.icon} align={'center'}
                                               textStyle={{paddingLeft: theme.sizes.gutters[2], fontWeight: 500}}/>}
                             bgColor={theme.background.main}>
                  {route.subRoutes.map((sRoute, idx) => {
                    return (
                      <Box key={idx} padding={`${theme.sizes.gutters[2]} ${theme.sizes.gutters[3]}`} isHover={true}
                           hoverColor={theme.background.glass} style={{borderRadius: '99999rem'}}>
                        <IconText text={sRoute.name} textSize={"medium"} icon={sRoute.icon} align={'center'}
                                  textStyle={{paddingLeft: theme.sizes.gutters[2]}}/>
                      </Box>
                    )
                  })}
                </Collapsible>
              )
            } else {
              return (
                <Box key={idx} padding={`${theme.sizes.gutters[2]} ${theme.sizes.gutters[3]}`} isHover={true}
                     hoverColor={theme.background.glass} style={{borderRadius: '9999rem'}}>
                  <IconText text={route.name} textSize={"medium"} icon={route.icon} align={'center'}
                            textStyle={{paddingLeft: theme.sizes.gutters[2], fontWeight: 500}}/>
                </Box>
              )
            }
          }
        )}
      </Box>
      <Box position={'absolute'} bottom={'.25rem'} left={'0'} right={'0'} display={'flex'} justifyContent={'center'}>
        <Button size={'sm'} rounded color='danger'>central log out</Button>
      </Box>
    </Box>
  )
}

const IEnabler = () => {

  const {student, isLoading} = useDataContext()
  const dispatch = useDataDispatch()
  const {contacts} = student;
  const theme = useTheme()
  const isLg = useMediaQuery({minWidth: theme.breakpoints.lg})

  const [drawerOpt, setDrawerOpt] = useImmer({
    width: 250,
    anchor: 'left',
    num: 0,
    open: true,
    fixed: false
  })

  useEffect(() => {
    dispatch({type: LOADING})
    setTimeout(() => {
      dispatch({type: LOADED})
    }, 2500)
  }, [])
  
  const handleClose = () => {
    setDrawerOpt(draft => {
      draft.open = false
    })
  }
  if (isLoading) {
    return <IEnablerLoader drawerOpen={drawerOpt.open || isLg} isLg={isLg}/>
  } else {
    return (
      <DrawerContainer drawerOpen={drawerOpt.open || isLg} drawerFixed={isLg} drawerWidth={drawerOpt.width}
                       drawerAnchor={drawerOpt.anchor}>
        <Drawer elevation={3} rounded anchor={drawerOpt.anchor} height={drawerOpt.width} width={drawerOpt.width}
                open={drawerOpt.open || isLg}
                fixed={isLg} onClose={handleClose}>
          <SideNav/>
        </Drawer>
        <Container maxWidth="lg">
          <Grid gridSpacing={2}>
            <GridCell colsMd={6} colsLg={7}>
              <Card>
                <Text fSize="x-large" fWeight="bold">Student Details</Text>
                <hr/>
                <Box marginBottom={theme.sizes.gutters[4]}>
                  <Card shadow>
                    <Grid gridSpacing={2} alignGrid="center">
                      <GridCell colsSm={4} colsLg={3} colsXg={2}>
                        <Image bordered src={Xe} alt={"profile"} radius="50%" height="70px" width="70px"/>
                      </GridCell>
                      <GridCell colsSm={8} colsLg={9} colsXg={10}>
                        <Box margin={`${theme.sizes.gutters[1]} 0`}>
                          <Text fSize="1.2em" fWeight="bold">{student.firstName} {student.lastName}</Text>
                        </Box>
                        <Text fSize="small" fWeight="bold" tColor={theme.color.secondary}>{student.studentNumber}</Text>
                      </GridCell>
                    </Grid>
                  </Card>
                </Box>
                <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[3]}>
                  <Grid>
                    {Object.keys(student).map((key, idx) => {
                      if (key.toLowerCase() !== "firstname" && key.toLowerCase() !== "lastname" && key.toLowerCase() !== "contacts") {
                        return (
                          <KeyPairDetails key={idx} k={key} v={student[key]}/>
                        )
                      }
                    })}
                  </Grid>
                </Box>
              </Card>
            </GridCell>
            <GridCell colsMd={6} colsLg={5}>
              <Card>
                <Text fSize="x-large" fWeight="bold">Contacts</Text>
                <hr/>
                <Box marginTop={theme.sizes.gutters[2]}>
                  <Grid>
                    {Object.keys(contacts).map((key, idx) => {
                      return (
                        <KeyPairDetails key={idx} k={key} v={contacts[key]}/>
                      )
                    })}
                  </Grid>
                </Box>
                <Box marginTop={theme.sizes.gutters[3]} display={'flex'} justifyContent={'flex-end'}>
                  <Button gradient rounded size="sm">update details</Button>
                </Box>
              </Card>
              <Card>
                <Box padding={`${theme.sizes.gutters[2]} 0`}>
                  <Text fSize="large" fWeight="bold">You owe institution</Text>
                  <Text fSize="small" fWeight="bold" tAlign="end" tColor="red">R 0.01</Text>
                </Box>
              </Card>
            </GridCell>
          </Grid>
        </Container>
      </DrawerContainer>
    )
  }
}

IEnabler.propTypes = {}

export default IEnabler
