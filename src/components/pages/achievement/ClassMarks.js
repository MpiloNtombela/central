import {useTheme} from "@emotion/react";
import React from 'react';
import Table, {TableData, TableHead, TableRow, TBody, TFoot, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from "../../layouts/Container";
import TabContext, {Tab, TabContent, Tabs} from "../../layouts/Tabs";

const randMark = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
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
                    let finalMark = 0;
                    return (<Table striped key={module} tableSize={'lg'} headColor={'info'} responsive>
                      <THead>
                        <TableRow>
                          <TableHead>{yr}:{sem}</TableHead>
                          <TableHead>MPLO{3 - idx}{sem}{module}</TableHead>
                          <TableHead>The long name of the module</TableHead>
                          <TableHead>Marks</TableHead>
                        </TableRow>
                      </THead>
                      <TBody>
                        {[1, 2, 3, 4].map((test) => {
                          const mark = randMark(test, 100)
                          finalMark += mark
                          return (
                            <TableRow key={test}>
                              <TableData colSpan={3}>Test {test}</TableData>
                              <TableData>{mark}</TableData>
                            </TableRow>
                          )
                        })}
                      </TBody>
                      <TFoot>
                        <TableRow style={{
                          background: theme.palette[finalMark < 200 ? 'danger' : 'success']?.main,
                          color: theme.palette[finalMark < 200 ? 'danger' : 'success']?.contrast.main,
                          fontWeight: 'bold'
                        }}>
                          <TableData colSpan={3}>Class Mark</TableData>
                          <TableData>{Math.floor((finalMark / 400) * 100)}</TableData>
                        </TableRow>
                      </TFoot>
                    </Table>)
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