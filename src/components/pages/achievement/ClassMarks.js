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

const ClassMarks = () => {
  const theme = useTheme()
  return (
    <Container maxWidth={'md'}>
      {[2021, 2020, 2019, 2018].map((yr, idx) => (
        <Card key={yr} style={{marginTop: theme.sizes.gutters[4], paddingLeft: 0, paddingRight: 0}}>
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
              <Tabs isFixed selectedTab={2}>
                {[1, 2].map((sem) => (
                  <Tab key={sem} value={sem}>Semester {sem}</Tab>
                ))}
              </Tabs>
              {[1, 2].map(sem => (
                <TabContent key={sem} value={sem}>
                  {[1, 2, 3, 4].map((module) => (
                    <Table striped key={module} tableSize={'lg'} headColor={'info'} responsive>
                      <THead>
                        <TableRow>
                          <TableHead cols>{yr}:{sem}</TableHead>
                          <TableHead>MODL{module}</TableHead>
                          <TableHead>The long name of the module</TableHead>
                          <TableHead>Marks</TableHead>
                        </TableRow>
                      </THead>
                      <TBody>
                        {[1, 2, 3, 4].map((test) => (
                          <TableRow key={test}>
                            <TableData colSpan={3}>Test {test}</TableData>
                            <TableData>{randMark(test, 100)}</TableData>
                          </TableRow>
                        ))}
                      </TBody>
                    </Table>
                  ))}
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