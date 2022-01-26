import {useTheme} from "@emotion/react";
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useMediaQuery} from "react-responsive";
import {useImmer} from "use-immer";
import Xe from "../../../../public/Xe.png"
import {useDataContext, useDataDispatch} from "../../../hooks/context";
import {LOADED, LOADING} from "../../DataContext";
import Button from '../../elements/Button'
import Image from "../../elements/Image";
import Text from '../../elements/Text'
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from '../../layouts/Container'
import Drawer, {DrawerContainer} from '../../layouts/Drawer'
import Grid, {GridCell} from "../../layouts/Grid";
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

const IEnabler = () => {

  const {student, isLoading} = useDataContext()
  const dispatch = useDataDispatch()
  const {contacts} = student;
  const theme = useTheme()
  const isLg = useMediaQuery({minWidth: theme.breakpoints.lg})

  const [test, setTest] = useImmer({
    width: 210,
    anchor: 'left',
    num: 0,
    open: false,
    fixed: false
  })

  useEffect(() => {
    dispatch({type: LOADING})
    setTimeout(() => {
      dispatch({type: LOADED})
    }, 2500)
  }, [])
  const anchors = ['left', 'top', 'right', 'bottom']

  const handleAnchor = () => {
    setTest(draft => {
      draft.anchor = anchors[draft.num]
    })
    setTest(draft => {
      draft.num === 3 ? draft.num = 0 : draft.num++
    })
  }
  const handleClose = () => {
    setTest(draft => {
      draft.open = false
    })
  }
  if (isLoading) {
    return <IEnablerLoader drawerOpen={isLg}/>
  } else {
    return (
      <DrawerContainer drawerOpen={isLg} drawerFixed={isLg} drawerWidth={test.width}
                       drawerAnchor={test.anchor}>
        <Drawer elevation={3} rounded anchor={test.anchor} height={test.width} width={test.width} open={isLg}
                fixed={isLg} onClose={handleClose}>
          <Collapsible header={"More here"} bgColor={theme.background.main}>
            <Text>link one</Text>
            <Text>link two</Text>
            <Text>link three</Text>
          </Collapsible>
          <Collapsible header={"More here"} bgColor={theme.background.main}>
            <Text>link one</Text>
            <Text>link two</Text>
            <Text>link three</Text>
          </Collapsible>
          <Collapsible header={"More here"} bgColor={theme.background.main}>
            <Text>link one</Text>
            <Text>link two</Text>
            <Text>link three</Text>
          </Collapsible>
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
                        <Image src={Xe} alt={"profile"} height="70px" width="70px"/>
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

          <div style={{position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999}}>
            <Button color='warning'
                    onClick={handleAnchor}
            >anchor</Button>
            <Button color='danger'
                    onClick={() => setTest(draft => {
                      draft.open = !test.open
                    })}>toggle</Button>
            <Button
              onClick={() => setTest(draft => {
                draft.fixed = !test.fixed
              })}
            >fixed</Button>
          </div>
        </Container>
      </DrawerContainer>
    )
  }
}

IEnabler.propTypes = {}

export default IEnabler
