import {useTheme} from "@emotion/react";
import PropTypes from 'prop-types'
import React from 'react'
import {useImmer} from "use-immer";
import {useDataContext} from "../../../hooks/context";
import Button from '../../elements/Button'
import Image from "../../elements/Image";
import Text from '../../elements/Text'
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Container from '../../layouts/Container'
import Drawer, {DrawerContainer} from '../../layouts/Drawer'
import Grid, {GridCell} from "../../layouts/Grid";
import Xe from "../../../../public/Xe.png"

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

const IEnabler = props => {

  const {student} = useDataContext()
  const {contacts} = student;
  const theme = useTheme()

  const [test, setTest] = useImmer({
    width: 250,
    anchor: 'left',
    num: 0,
    open: false,
    fixed: false
  })
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
  return (
    <DrawerContainer drawerOpen={test.open} drawerFixed={test.fixed} drawerWidth={test.width}
                     drawerAnchor={test.anchor}>
      <Drawer elevation={3} rounded anchor={test.anchor} height={test.width} width={test.width} open={test.open}
              fixed={test.fixed} onClose={handleClose}>
        <Text fSize='medium' fWeight='bold'>Mpilo</Text>
      </Drawer>
      <Container maxWidth="lg">
        <Grid gridSpacing={2}>
          <GridCell colsMd={6} colsLg={7}>
            <Card>
              <Text fSize="x-large" fWeight="bold">Main Info</Text>
              <hr/>
              <Box marginBottom={theme.sizes.gutters[4]}>
                <Card shadow>
                  <Grid gridSpacing={2}>
                    <GridCell colsSm={4}>
                      <Image src={Xe} alt={"profile"} height="150px" width="150px"/>
                    </GridCell>
                    <GridCell colsSm={8}>
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
              <Box marginTop={theme.sizes.gutters[3]} display={'flex'}>
                <Button gradient rounded size="sm">update details</Button>
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

IEnabler.propTypes = {}

export default IEnabler
