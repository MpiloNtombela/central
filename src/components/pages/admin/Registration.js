import {useTheme} from "@emotion/react";
import React from 'react';
import {useDataContext} from "../../../hooks/context";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Container from "../../layouts/Container";

const RegisteredQual = () => {
  const data = useDataContext()
  const applications = [...data.applications].filter(app => app.status.toLowerCase() === 'accept offer').sort((a, b) => b.year - a.year)

  return (
    <Table tableSize={'lg'} striped responsive headColor={'info'}>
      <THead>
        <TableRow>
          <TableHead>Year</TableHead>
          <TableHead>Qual code</TableHead>
          <TableHead>Qual name</TableHead>
          <TableHead>Approved Description</TableHead>
          <TableHead>College</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead>Majors</TableHead>
        </TableRow>
      </THead>
      <TBody>
        {[2021, 2020, ...applications].map((app) => (
            [2, 1].map(sem => {
              if (typeof app === 'object') {
                return (
                  <TableRow key={sem}>
                    <TableData>{app.year}:{sem}</TableData>
                    <TableData>{app.qualification}</TableData>
                    <TableData>{app.description}</TableData>
                    <TableData>{app.description}</TableData>
                    <TableData>{app.college}</TableData>
                    <TableData>02/02/{app.year}</TableData>
                    <TableData>First Major, Second Major</TableData>
                  </TableRow>
                )
              } else {
                return (
                  <TableRow key={sem}>
                    <TableData>{app}:{sem}</TableData>
                    <TableData>{applications[0].qualification}</TableData>
                    <TableData>{applications[0].description}</TableData>
                    <TableData>{applications[0].description}</TableData>
                    <TableData>{applications[0].college}</TableData>
                    <TableData>02/02/{app}</TableData>
                    <TableData>First Major, Second Major</TableData>
                  </TableRow>
                )
              }
            })
          )
        )}
      </TBody>
    </Table>
  )
}


const Registration = () => {
  const theme = useTheme()

  return (
    <Container maxWidth={'lg'}>
      <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[2]}>
        <Text fSize={'large'} fWeight={'bold'}>Registered Qualifications</Text>
      </Box>
      <RegisteredQual/>
    </Container>
  );
};

export default Registration;