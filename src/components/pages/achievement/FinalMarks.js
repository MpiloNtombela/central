import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";
import {useImmerReducer} from "use-immer";
import Button from "../../elements/Button";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Chip from "../../layouts/Chip";
import Collapsible from "../../layouts/Collapsible";
import Container from "../../layouts/Container";
import Drawer from "../../layouts/Drawer";
import TabContext, {Tab, TabContent, Tabs} from "../../layouts/Tabs";

const randMarks = (min, max, len = 4) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  let marx = []
  for (let x = 0; x < len; x++) {
    marx.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return marx
}


const FinalContext = React.createContext()
const FinalDispatch = React.createContext()

const UPDATE_DATA = 'UPDATE_DATA'
const ADD_PASS = 'ADD_PASS'
const ADD_FAIL = 'ADD_FAIL'

const initData = {
  risks: [],
  deans: [],
  failed: [],
  passed: [],
}

const finalReducer = (draft, {payload, type}) => {
  switch (type) {
    case UPDATE_DATA:
      payload.deans && draft.deans.push(payload.deans)
      payload.risks && draft.risks.push(payload.risks)
      break
    case ADD_FAIL:
      draft.failed.push(payload)
      break
    case ADD_PASS:
      draft.passed.push(payload)
      break
    default:
      return draft
  }
}


const Semester = ({yr, sem, mod, theme}) => {
  const [marks] = useState(randMarks(30, 100))
  const [dean] = useState((marks.reduce((a, b) => a + b) / 400) * 100 >= 75 && marks.every(x => x >= 60))
  const [risk] = useState(marks.reduce((total, x) => (x < 50 ? total + 1 : total), 0) >= 2)
  const [loading, setLoading] = useState(true)
  const dispatch = useContext(FinalDispatch);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500)
    dispatch({
      type: UPDATE_DATA,
      payload: {
        risks: risk ? {yr, sem} : false,
        deans: dean ? {yr, sem} : false,
      }
    })
    marks.forEach((mark, idx) => {
      const mod = `MPLO${yr - 2018}${sem}${idx}`
      if (mark < 50) {
        dispatch({type: ADD_FAIL, payload: mod})
      } else {
        dispatch({type: ADD_PASS, payload: mod})
      }
    })
  }, [])

  if (loading) {
    return <Text fSize={'large'} fWeight={'bold'} tAlign={'center'}>Loading...</Text>
  } else {
    return (
      <>
        {dean &&
          <Box
            padding={theme.sizes.gutters[2]}
            marginBottom={theme.sizes.gutters[2]}
            style={{
              background: theme.palette.info.dark,
              borderRadius: theme.sizes.radius.sm
            }}>
            <Text tColor={theme.palette.info.contrast.dark} fWeight={'bold'} fSize={'medium'} tAlign={'center'}>Mpilo
              Commendation</Text>
          </Box>}
        {risk &&
          <Box
            padding={theme.sizes.gutters[2]}
            marginBottom={theme.sizes.gutters[2]}
            style={{
              background: theme.palette.warning.light,
              borderRadius: theme.sizes.radius.sm
            }}>
            <Text tColor={theme.palette.warning.contrast.light} fWeight={'bold'} fSize={'medium'} tAlign={'center'}>
              unsatisfactory academic results
            </Text>
          </Box>}
        <Table striped tableSize={'lg'} headColor={'info'} responsive>
          <THead>
            <TableRow>
              <TableHead>Sem</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Desc</TableHead>
              <TableHead>Mark</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Explanation</TableHead>
            </TableRow>
          </THead>
          <TBody>
            {marks.map((mark, idx) => {
              const mod = `MPLO${yr - 2018}${sem}${idx}`
              return (
                <TableRow key={idx}>
                  <TableData style={{whiteSpace: 'nowrap'}}>{yr}:{sem}</TableData>
                  <TableData style={{whiteSpace: 'nowrap'}}>{mod}</TableData>
                  <TableData style={{whiteSpace: 'nowrap'}}>The long name of a module</TableData>
                  <TableData style={{whiteSpace: 'nowrap'}}>{mark}</TableData>
                  <TableData style={{whiteSpace: 'nowrap'}}>{mark < 50 ? 'F' : 'P'}</TableData>
                  <TableData style={{whiteSpace: 'nowrap'}}>
                    {mark > 85 ? 'Certificate of Merit' : mark < 50 ? mark < 40 ? 'Fail' : 'Supp Granted' : 'Pass'}
                  </TableData>
                </TableRow>
              )
            })}
          </TBody>
        </Table>
      </>
    )
  }
}

const DataOverview = ({data, title, theme, dataFor}) => {
  return (
    <Box marginTop={theme.sizes.gutters[4]}>
      <Text fSize={'small'} fWeight={'bold'} tAlign={'center'}>{title}</Text>
      <Box marginTop={theme.sizes.gutters[2]} display={'flex'} style={{flexWrap: 'wrap'}}
           justifyContent={'center'}>
        {data.map((x, idx) => {
          if (dataFor === 'deans' || dataFor === 'risks') {
            return (
              <Box key={idx} margin={theme.sizes.gutters[1]} display={'inline'}>
                <Chip color={dataFor === 'deans' ? 'info' : 'warning'} text={`${x.yr}:${x.sem}`}/>
              </Box>
            )
          } else {
            return (
              <Box key={idx} margin={theme.sizes.gutters[1]} display={'inline'}>
                <Chip color={dataFor === 'passed' ? 'success' : 'danger'} text={x}/>
              </Box>
            )
          }
        })}
      </Box>
    </Box>
  )
}

const DataOverviewDrawer = ({open, handleClose, theme}) => {
  const {deans, risks, passed, failed} = useContext(FinalContext)
  const isSm = useMediaQuery({maxWidth: theme.breakpoints.sm})

  return (
    <Drawer rounded={isSm}
            onClose={handleClose}
            open={open}
            width={'310px'}
            style={{maxHeight: '80%'}}
            elevation={4}
            anchor={isSm ? 'bottom' : 'right'}>
      <Container style={{
        overflowY: 'auto',
        maxHeight: '70vh',
        background: 'transparent',
        padding: `${theme.sizes.gutters[4]} 0`
      }}>
        <Text fSize={'x-large'} tAlign={'center'} fWeight={'bold'}>Academic overview</Text>
        <Box
          padding={theme.sizes.gutters[2]}
          margin={theme.sizes.gutters[3]}
          style={{
            background: theme.palette.info.glass,
            borderRadius: theme.sizes.radius.xxl
          }}>
          <Text tColor={theme.palette.info.contrast.glass} fWeight={'bold'} fSize={'small'} tAlign={'center'}>
            points obtained: {passed.length * 16} / {(passed.length + failed.length) * 16}
          </Text>
        </Box>
        {deans.length > 0 && <DataOverview data={deans} dataFor={'deans'} title={'Mpilo Commendation'} theme={theme}/>}
        {passed.length > 0 && <DataOverview data={passed} dataFor={'passed'} title={'Passed Modules'} theme={theme}/>}
        {failed.length > 0 && <DataOverview data={failed} dataFor={'failed'} title={'Failed Modules'} theme={theme}/>}
        {risks.length > 0 && <DataOverview data={risks} dataFor={'risks'} title={'Risk Semesters'} theme={theme}/>}
      </Container>
    </Drawer>
  )
}

const FinalMark = () => {
  const theme = useTheme()
  const [finalData, dispatch] = useImmerReducer(finalReducer, initData)
  const [openOverview, setOpenOverview] = useState(false)

  const handleToggleOverview = () => {
    setOpenOverview(!openOverview)
  }

  return (
    <FinalContext.Provider value={finalData}>
      <FinalDispatch.Provider value={dispatch}>
        <Container maxWidth={'md'}>
          <Box marginTop={theme.sizes.gutters[4]}/>
          {[2021, 2020, 2019, 2018].map((yr, idx) => (
            <Card key={yr} style={{marginBottom: theme.sizes.gutters[4], paddingLeft: 0, paddingRight: 0}}>
              <Collapsible collapsed={idx === 0}
                           isHighlighted={false}
                           header={
                             <Box paddingTop={theme.sizes.gutters[2]} paddingBottom={theme.sizes.gutters[2]}>
                               <Text fSize={'medium'}
                                     fWeight={'bold'}
                                     tColor={theme.palette.dark.main}>
                                 {yr === 2018 ? "Bachelor of Arts [B-ART]"
                                   : "Bachelor of Social Sciences [BSS]"} - {yr}</Text>
                             </Box>}
                           marginBottom={theme.sizes.gutters[4]}>
                <TabContext>
                  <Box paddingLeft={theme.sizes.gutters[2]} paddingRight={theme.sizes.gutters[2]}>
                    <Tabs isFixed selectedTab={2}>
                      {[1, 2].map((sem) => (
                        <Tab key={sem} value={sem}>Semester {sem}</Tab>
                      ))}
                    </Tabs>
                  </Box>
                  {[1, 2].map(sem => {
                    return (
                      <TabContent key={sem} value={sem}>
                        <Semester yr={yr} sem={sem} theme={theme}/>
                      </TabContent>)
                  })}
                </TabContext>
              </Collapsible>
            </Card>
          ))}
        </Container>
        <Box position={'fixed'} bottom={theme.sizes.gutters[4]} right={theme.sizes.gutters[4]}>
          <Button onClick={handleToggleOverview} size={'md'} color={'secondary'}>Overview</Button>
        </Box>
        <DataOverviewDrawer handleClose={handleToggleOverview} open={openOverview} theme={theme}/>
      </FinalDispatch.Provider>
    </FinalContext.Provider>
  );
};

DataOverviewDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  theme: PropTypes.any
}

DataOverview.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.any.isRequired,
  dataFor: PropTypes.string.isRequired,
}


export default FinalMark;