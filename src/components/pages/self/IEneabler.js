import {useTheme} from "@emotion/react";
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useImmer} from "use-immer";
import {useDataContext} from "../../../hooks/context";
import Card from "../../layouts/Card";
import Container from '../../layouts/Container'
import Text from '../../elements/Text'
import Drawer, {DrawerContainer} from '../../layouts/Drawer'
import Button from '../../elements/Button'
import Grid, {GridCell} from "../../layouts/Grid";

const KeyPairDetails = ({k, v}) =>{
  return(
    <>
      <GridCell colsSm={6}>{k.toUpperCase()}</GridCell>
      <GridCell colsSm={6}>{v}</GridCell>
    </>
  )
}

KeyPairDetails.propTypes = {
  k: PropTypes.string.isRequired,
  v: PropTypes.string.isRequired,
}

const IEnabler = props => {

  const {student} = useDataContext()
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
      <Container maxWidth="xl">
        <Grid gridSpacing={2}>
          <GridCell colsMd={7}>
            <Card>
              <Text fSize="large" fWeight="bold">Main Info</Text>
              <Grid gridSpacing={2}>
                <GridCell colsSm={4}>

                </GridCell>
                <GridCell colsSm={8}>
                  <Text fSize="medium" fWeight="bold">{student.firstName} {student.lastName}</Text>
                  <Text fSize="small" fWeight="bold" tColor={theme.color.secondary}>{student.studentNumber}</Text>
                </GridCell>
              </Grid>
              <Grid>
                {Object.keys(student).map((key, idx) => {
                  if (key.toLowerCase() !== "firstname" && key.toLowerCase() !== "lastname" && key.toLowerCase() !== "contacts") {
                    return (
                      <KeyPairDetails key={idx} k={key} v={student[key]}/>
                    )
                  }
                })}
              </Grid>
            </Card>
          </GridCell>
          <GridCell colsMd={5}>
            <Card>
              <Text fSize="large" fWeight="bold">Side Info</Text>
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
