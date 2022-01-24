import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useImmer} from "use-immer";
import Card from "../../layouts/Card";
import Container from '../../layouts/Container'
import Text from '../../elements/Text'
import Drawer, {DrawerContainer} from '../../layouts/Drawer'
import Button from '../../elements/Button'
import Grid, {GridCell} from "../../layouts/Grid";

const IEnabler = props => {
  const [test, setTest] = useImmer({
    width: 250,
    anchor: 'left',
    num: 0,
    open: true,
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
        <Grid spacing={2}>
          <GridCell colsMd={7}>
            <Card>
              <Text fSize="large" fWeight="bold">Main Info</Text>
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
