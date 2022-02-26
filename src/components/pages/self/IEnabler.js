import {useTheme} from "@emotion/react";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {MdMoneyOff} from "react-icons/md";
import {useMediaQuery} from "react-responsive";
import {useImmer} from "use-immer";
import logo from "../../../../public/logo.png"
import {useDataContext, useDataDispatch} from "../../../hooks/context";
import {SETUP_ALERT} from "../../DataContext";
import Button from '../../elements/Button'
import IconText from "../../elements/IconText";
import Image from "../../elements/Image";
import {NAV_HEIGHT} from "../../elements/Navbar";
import Text from '../../elements/Text'
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from '../../layouts/Container'
import Drawer, {DrawerContainer} from '../../layouts/Drawer'
import Grid, {GridCell} from "../../layouts/Grid";
import TabContext, {Tab, TabContent, Tabs} from "../../layouts/Tabs";
import iRoutes from "../utils/ienablerRoutes";
import IEnablerLoader from "./IEnablerLoader";

export const caseOut = (str) => {
  const r = /([a-z])([A-Z])/g
  return str.replace(r, '$1 $2')
}

const KeyValuePair = ({k, v}) => {
  return (
    <>
      <GridCell colsSm={6}>
        {k}
      </GridCell>
      <GridCell colsSm={6}>
        {v}
      </GridCell>
    </>
  )
}

KeyValuePair.propTypes = {
  k: PropTypes.node.isRequired,
  v: PropTypes.node.isRequired,
}

const SideNav = ({anchor, changeAnchor, fixed}) => {
  const theme = useTheme()
  return (
    <Box position='relative' height='100%' paddingBottom='3rem' paddingTop={fixed ? `${NAV_HEIGHT}rem` : 'unset'}
         style={{boxSizing: 'border-box'}}>
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
                     hoverColor={theme.palette.primary.main}
                     style={{
                       borderRadius: `${anchor === 'left' ? '0 9999rem 9999rem 0' : '9999rem 0 0 9999rem'}`
                     }}>
                  <IconText text={route.name} textSize={"medium"} icon={route.icon} align={'center'}
                            textStyle={{paddingLeft: theme.sizes.gutters[2], fontWeight: 500}}/>
                </Box>
              )
            }
          }
        )}
      </Box>
      <Box position={'absolute'} bottom={'.25rem'} left={'0'} right={'0'} display={'flex'} justifyContent={'center'}>
        <Button onClick={changeAnchor} size={'sm'} rounded color='danger'>central log out</Button>
      </Box>
    </Box>
  )
}

const IEnabler = () => {
  const [isLoading, setIsLoading] = useState(true)
  const {student, applications} = useDataContext()
  const applicationsData = [...applications].sort((a, b) => b.year - a.year || a.preference - b.preference)
  const dispatch = useDataDispatch()
  const {contacts} = student;
  const theme = useTheme()
  const isLg = useMediaQuery({minWidth: theme.breakpoints.lg})

  const [drawerOpt, setDrawerOpt] = useImmer({
    width: 250,
    anchor: 'left',
    open: true,
    fixed: false
  })

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)
  }, [])

  const handleOpen = () => {
    setDrawerOpt(draft => {
      draft.open = true
    })
  }
  const handleClose = () => {
    setDrawerOpt(draft => {
      draft.open = false
    })
  }

  const changeAnchor = () => {
    setDrawerOpt(draft => {
      draft.anchor = drawerOpt.anchor === "left" ? "right" : "left"
    })
  }

  const handleMessage = (msg, status) => {
    dispatch({
      type: SETUP_ALERT,
      payload: {
        message: msg,
        status: status
      }
    })
  }

  if (isLoading) {
    return <IEnablerLoader fixed={isLg} drawerOpen={drawerOpt.open || isLg} isLg={isLg} drawerAnchor={drawerOpt.anchor}
                           drawerWidth={drawerOpt.width}/>
  } else {
    return (
      <DrawerContainer drawerOpen={drawerOpt.open || isLg} drawerFixed={isLg} drawerWidth={drawerOpt.width}
                       drawerAnchor={drawerOpt.anchor}>
        <Drawer elevation={3} rounded anchor={drawerOpt.anchor} height={drawerOpt.width} width={drawerOpt.width}
                open={drawerOpt.open || isLg}
                fixed={isLg} onClose={handleClose}>
          <SideNav fixed={isLg} anchor={drawerOpt.anchor} changeAnchor={changeAnchor}/>
        </Drawer>
        <Container maxWidth="xl" style={{paddingBottom: '1.75rem'}}>
          <TabContext>
            <Tabs center isFixed>
              <Tab value={"details"}>Details</Tab>
              <Tab value={"applications"}>Applications</Tab>
              <Tab value={"financial"}>Financial</Tab>
            </Tabs>
            <TabContent value={"details"}>
              <Grid gridSpacing={2}>
                <GridCell colsMd={6} colsLg={7}>
                  <Card>
                    <Text fSize="x-large" fWeight="bold">Student Details</Text>
                    <hr/>
                    <Box marginBottom={theme.sizes.gutters[4]}>
                      <Card shadow>
                        <Box display={"flex"} alignItems={"center"}>
                          <Box>
                            <Image bordered src={logo} alt={"profile"} radius="50%" height="70px" width="70px"/>
                          </Box>
                          <Box marginLeft={theme.sizes.gutters[2]}>
                            <Box margin={`${theme.sizes.gutters[1]} 0`}>
                              <Text fSize="1.2em" fWeight="bold">{student.firstName} {student.lastName}</Text>
                            </Box>
                            <Text fSize="small" fWeight="bold"
                                  tColor={theme.color.secondary}>{student.studentNumber}</Text>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                    <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[3]}>
                      <Grid>
                        {Object.keys(student).map((key, idx) => {
                          if (key.toLowerCase() !== "firstname" && key.toLowerCase() !== "lastname" && key.toLowerCase() !== "contacts") {
                            return (
                              <KeyValuePair key={idx} k={
                                <Box margin={'.5rem 0'}>
                                  <Text fWeight={'bold'} fSize={'.85em'}
                                        tColor={"grey"}>{caseOut(key).toUpperCase()}</Text>
                                </Box>
                              } v={
                                <Box margin={'.5rem 0'}>
                                  <Text fSize={'.85em'}>{student[key]}</Text>
                                </Box>
                              }/>
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
                            <KeyValuePair key={idx} k={
                              <Box margin={'.5rem 0'}>
                                <Text fWeight={'bold'} fSize={'.85em'}
                                      tColor={"grey"}>{caseOut(key).toUpperCase()}</Text>
                              </Box>
                            } v={
                              <Box padding={'.75rem .25rem'}
                                   style={{
                                     borderRadius: theme.sizes.radius.sm,
                                     maxWidth: 'calc(100%)',
                                   }}>
                                <Text style={{
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                }} fSize={'.85em'}>{contacts[key]}</Text>
                              </Box>
                            }/>
                          )
                        })}
                      </Grid>
                    </Box>
                    <Box marginTop={theme.sizes.gutters[3]} display={'flex'} justifyContent={'flex-end'}>
                      <Button
                        onClick={() => handleMessage('update details button', 'info')}
                        color={'primary'}
                        rounded
                        size="sm">update details</Button>
                    </Box>
                  </Card>
                  <Box margin={`${theme.sizes.gutters[2]} auto`}>
                    <Card>
                      <Box padding={`${theme.sizes.gutters[2]} 0`}>
                        <Text fSize="large" fWeight="bold">You owe institution</Text>
                        <Text fSize="small" fWeight="bold" tAlign="end" tColor="red">R 0.01</Text>
                      </Box>
                    </Card>
                  </Box>
                </GridCell>
              </Grid>
            </TabContent>
            <TabContent value={"applications"}>
              {applicationsData.map((application) => {
                return (
                  <Card key={application.qualification} style={{margin: `${theme.sizes.gutters[2]} auto`}}
                        maxWidth={"md"}>
                    <Text fWeight={'bold'}
                          fSize={"medium"}>{application.description} - ({application.qualification})</Text>
                    <Grid>
                      {Object.keys(application).map((key, idx) => {
                        if (key !== "description" && key !== "qualification" && key !== "code") {
                          return (
                            <KeyValuePair key={idx} k={
                              <Box margin={'.5rem 0'}>
                                <Text fWeight={'bold'} fSize={'.85em'} tColor={"grey"}>{key.toUpperCase()}</Text>
                              </Box>
                            } v={
                              <Box margin={'.5rem 0'}>
                                <Text fSize={'.85em'}>{application[key]}</Text>
                              </Box>
                            }/>
                          )
                        }
                      })}
                    </Grid>
                    {application.status.toLowerCase().trim() === "firm offer" &&
                      <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button
                          onClick={() => handleMessage('reject offer button', 'danger')}
                          rounded
                          size={"sm"}
                          outlined color={"danger"}
                          style={{marginRight: theme.sizes.gutters[1]}}>
                          reject
                        </Button>
                        <Button
                          onClick={() => handleMessage('accept offer button', 'success')}
                          rounded
                          size={"sm"}
                          color={"info"}
                          style={{marginLeft: theme.sizes.gutters[1]}}>
                          Accept
                        </Button>
                      </Box>}
                  </Card>
                )
              })}
            </TabContent>
            <TabContent value={"financial"}>
              <Box display={"flex"} justifyContent={"center"} marginTop={theme.sizes.gutters[4]}
                   marginBottom={theme.sizes.gutters[4]}>
                <MdMoneyOff color={theme.color.secondary} size={172}/>
              </Box>
              <Text tColor={theme.color.secondary} fSize={"large"} fWeight={"700"} tAlign={"center"}>No Financial
                Record</Text>
            </TabContent>
          </TabContext>
          {!isLg &&
            <Button
              onClick={handleOpen}
              style={{
                position: 'fixed',
                bottom: `1rem`,
                right: drawerOpt.anchor === 'left' ? '1.25rem' : 'unset',
                left: drawerOpt.anchor === 'right' ? '1.25rem' : 'unset',
              }} color={'secondary'}>menu</Button>}
        </Container>
      </DrawerContainer>
    )
  }
}

IEnabler.propTypes = {}
SideNav.propTypes = {
  anchor: PropTypes.oneOf(["top", "left", "bottom", "right"]),
  changeAnchor: PropTypes.func,
  fixed: PropTypes.bool,
}
export default IEnabler
