import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React from 'react';
import {useDataContext} from "../../../hooks/context";
import Button from "../../elements/Button";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Container from "../../layouts/Container";

const RegisteredQual = ({theme}) => {
  const data = useDataContext()
  const applications = [...data.applications].filter(app => app.status.toLowerCase() === 'accept offer').sort((a, b) => b.year - a.year)

  return (
    <Table tableSize={'lg'} striped responsive>
      <THead>
        <TableRow style={{background: theme.palette.info.glass}}>
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

const RegisteredModules = ({theme}) => {

  return (
    <>
      <Table striped tableSize={'lg'} responsive>
        <THead>
          <TableRow style={{background: theme.palette.info.glass}}>
            <TableHead>Semester</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Module Desc</TableHead>
            <TableHead>Reg Type</TableHead>
            <TableHead>Cancellation Date</TableHead>
            <TableHead>Time Block</TableHead>
            <TableHead>Module Info</TableHead>
          </TableRow>
        </THead>
        <TBody>
          {[2021, 2020, 2019, 2018].map((yr) =>
            [1, 2].map(sem => (
              <React.Fragment key={yr}>
                <TableRow style={{background: theme.palette.info.light, height: '1.75rem'}}>
                  <TableData colSpan={7}>
                    <Text fSize={'medium'} fWeight={'bold'} tAlign={'center'}>{yr}:{sem}</Text>
                  </TableData>
                </TableRow>
                <>
                  {[1, 2, 3, 4].map((x) => {
                    const mod = `MPLO${yr - 2018}${sem}${x}`
                    if (!(yr === 2018 && x > 2)) {
                      return (
                        <TableRow key={x}>
                          <TableData>{yr}:{sem}</TableData>
                          <TableData>{mod}</TableData>
                          <TableData>The long name of a module</TableData>
                          <TableData>Normal</TableData>
                          <TableData></TableData>
                          <TableData>{x % 2 === 0 ? 'F' : 'G'}</TableData>
                          <TableData>
                            <Button rounded color={'primary'} size={'sm'} elevation={0}>view info</Button>
                          </TableData>
                        </TableRow>
                      )
                    }
                  })}
                </>
              </React.Fragment>
            )))}
        </TBody>
      </Table>
    </>
  )
}


const Registration = () => {
  const theme = useTheme()

  return (
    <Container maxWidth={'lg'}>
      <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[2]}>
        <Text fSize={'large'} fWeight={'bold'}>Registered Qualifications</Text>
      </Box>
      <RegisteredQual theme={theme}/>
      <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[2]}>
        <Text fSize={'large'} fWeight={'bold'}>Registered Modules</Text>
      </Box>
      <RegisteredModules theme={theme}/>
    </Container>
  );
};

RegisteredQual.propTypes = {
  theme: PropTypes.any
}
RegisteredModules.propTypes = {
  theme: PropTypes.any
}

export default Registration;