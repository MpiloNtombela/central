import {useTheme} from "@emotion/react";
import React from 'react';
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../../elements/Table";
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

const FinalMark = () => {
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
              {[1, 2].map(sem => (
                <TabContent key={sem} value={sem}>
                  {[1].map((module) => {
                    return (
                      <Table striped key={module} tableSize={'lg'} headColor={'info'} responsive>
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
                          {[1, 2, 3, 4].map((test, idx) => {
                            const mark = randMark(test, 100)
                            return (
                              <TableRow key={test}>
                                <TableData>{yr}:{sem}</TableData>
                                <TableData>MPLO{yr - 2018}{sem}{idx}</TableData>
                                <TableData>The long name of module</TableData>
                                <TableData>{mark}</TableData>
                                <TableData>{mark < 50 ? 'F' : 'P'}</TableData>
                                <TableData>{mark > 85 ? 'Certificate of Merit' : mark < 50 ? 'Fail' : 'Pass'}</TableData>
                              </TableRow>
                            )
                          })}
                        </TBody>
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

export default FinalMark;