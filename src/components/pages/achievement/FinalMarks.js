import {useTheme} from "@emotion/react";
import React, {useEffect, useState} from 'react';
import {useImmerReducer} from "use-immer";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from "../../layouts/Container";
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

const ADD_DEAN = 'ADD_DEAN'
const ADD_PASS = 'ADD_PASS'
const ADD_FAIL = 'ADD_FAIL'

const initData = {
  risks: false,
  deans: 0,
  fails: 0,
  passed: 0
}

const finalReducer = (draft, action) => {
  switch (action.type) {
    case ADD_DEAN:
      draft.deans = action.payload
      break
    case ADD_PASS:
      draft.passed = action.payload
      break
    case ADD_FAIL:
      draft.pass = action.payload
      break
  }
}


const Semester = ({yr, sem, theme}) => {
  const [marks] = useState(randMarks(30, 100))
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500)

  }, [])

  if (loading) {
    return <Text fSize={'large'} fWeight={'bold'} tAlign={'center'}>Loading...</Text>
  } else {
    return (
      <>
        {(marks.reduce((a, b) => a + b) / 400) * 100 >= 75 && marks.every(x => x >= 60) &&
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
              return (
                <TableRow key={idx}>
                  <TableData>{yr}:{sem}</TableData>
                  <TableData>MPLO{yr - 2018}{sem}{idx}</TableData>
                  <TableData>The long name of module</TableData>
                  <TableData>{mark}</TableData>
                  <TableData>{mark < 50 ? 'F' : 'P'}</TableData>
                  <TableData>
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

const FinalMark = () => {
  const theme = useTheme()
  const [finalData, dispatch] = useImmerReducer(finalReducer, initData)
  return (
    <FinalContext.provider value={finalData}>
      <FinalDispatch.provider value={dispatch}>
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
      </FinalDispatch.provider>
    </FinalContext.provider>
  );
};

export default FinalMark;