import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Container from '../../layouts/Container'
import Text from '../../elements/Text'
import Drawer from '../../layouts/Drawer'
import Button from '../../elements/Button'

const IEnabler = props => {
  const [test, setTest] = useState({
    width: 200,
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
    setTest(prevState => {
      return {...prevState, num: prevState.num === 3 ? prevState.num = 0 : prevState.num++}
    })
  }
  const handleClose = () => {
    setTest(prevState => {
      return {...prevState, open: false}
    })
  }
  return (
    <Container>
      <Drawer elevation={3} rounded anchor={test.anchor} height={test.width} width={test.width} open={test.open}
              fixed={test.fixed} onClose={handleClose}>
        <Text fSize='medium' fWeight='bold'>Mpilo</Text>
      </Drawer>
      <Text fSize='x-large' fWeight='bold'>iEnabler System iEnabler System iEnabler System iEnabler System iEnabler
        System</Text>
      <br/>
      <div style={{position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999}}>
        <Button color='warning'
                onClick={handleAnchor}
        >anchor</Button>
        <Button color='danger'
                onClick={() => setTest(prevState => {
                  return {...prevState, open: !prevState.open}
                })}
        >toggle</Button>
        <Button
          onClick={() => setTest(prevState => {
            return {...prevState, fixed: !prevState.fixed}
          })}
        >fixed</Button>
      </div>
    </Container>
  )
}

IEnabler.propTypes = {}

export default IEnabler
