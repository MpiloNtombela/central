import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import Table, {TableData, TableHead, TableRow, TBody, TFoot, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from "../../layouts/Container";
import TabContext, {Tab, TabContent, Tabs} from "../../layouts/Tabs";
import {randMarks} from "./FinalMarks";

const Module = ({yr, sem, mod, theme}) => {
  const [marks] = useState(randMarks(30, 100))
  const [finalMark] = useState(Math.floor((marks.reduce((a, b) => a + b) / (marks.length * 100)) * 100))

  return (
    <Table striped tableSize={'lg'} headColor={'info'} responsive>
      <THead>
        <TableRow>
          <TableHead>{yr}:{sem}</TableHead>
          <TableHead>MPLO{yr - 2018}{sem}{mod}</TableHead>
          <TableHead>The long name of the module</TableHead>
          <TableHead>Marks</TableHead>
        </TableRow>
      </THead>
      <TBody>
        {marks.map((mark, idx) => {
          return (
            <TableRow key={idx}>
              <TableData colSpan={3}>Test {idx + 1}</TableData>
              <TableData>{mark}</TableData>
            </TableRow>
          )
        })}
      </TBody>
      <TFoot>
        <TableRow style={{
          background: theme.palette[finalMark < 50 ? 'danger' : 'success']?.main,
          color: theme.palette[finalMark < 50 ? 'danger' : 'success']?.contrast.main,
          fontWeight: 'bold'
        }}>
          <TableData colSpan={3}>Class Mark</TableData>
          <TableData>{finalMark}</TableData>
        </TableRow>
      </TFoot>
    </Table>
  )
}

Module.propTypes = {
  yr: PropTypes.number.isRequired,
  sem: PropTypes.number.isRequired,
  mod: PropTypes.number.isRequired,
  theme: PropTypes.any.isRequired
}

const ClassMarks = () => {
  const theme = useTheme()
  return (
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
                             {yr} Class Results</Text>
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
              {[1, 2].map(sem => (
                <TabContent key={sem} value={sem}>
                  {[1, 2, 3, 4].map((module) => {
                    if (!(yr === 2018 && module <= 2)) {
                      return (
                        <Module key={module} mod={module} yr={yr} sem={sem} theme={theme}/>
                      )
                    }
                  })}
                </TabContent>
              ))}
            </TabContext>
          </Collapsible>
        </Card>
      ))}
    </Container>
  );
};

export default ClassMarks;