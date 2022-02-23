import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import {FaBan} from "react-icons/fa";
import {useDataContext} from "../../../hooks/context";
import Button from "../../elements/Button";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../../elements/Table";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Container from "../../layouts/Container";
import Loader from "../../layouts/Loader";
import Modal, {ModalContent} from "../../layouts/Modal";

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

const RegisteredModules = ({theme, handleViewInfo}) => {
  return (
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
                          <Button
                            rounded
                            color={'primary'}
                            size={'sm'} elevation={0}
                            onClick={handleViewInfo}>
                            view info
                          </Button>
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
  )
}


const Registration = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [load, setLoad] = useState(true)

  const handleModalToggle = () => {
    setOpen(!open)
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 2000)
  }
  return (
    <Container maxWidth={'lg'}>
      <Box marginBottom={theme.sizes.gutters[4]}/>
      <Text fSize={'large'} fWeight={'bold'} tAlign={'center'}>Registration History</Text>
      <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[2]}>
        <Card>
          <Text fSize={'medium'} fWeight={'bold'}>Registered Qualifications</Text>
          <Box marginBottom={theme.sizes.gutters[3]}/>
          <RegisteredQual theme={theme}/>
        </Card>
      </Box>
      <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[2]}>
        <Card>
          <Text fSize={'medium'} fWeight={'bold'}>Registered Modules</Text>
          <Box marginBottom={theme.sizes.gutters[3]}/>
          <RegisteredModules theme={theme} handleViewInfo={handleModalToggle}/>
        </Card>
      </Box>
      <Modal open={open} onClose={handleModalToggle} centerVert>
        <ModalContent>
          {load ? <Loader/> :
            <><Box marginBottom={theme.sizes.gutters[4]} display={'flex'} justifyContent={'center'}>
              <FaBan size={72} color={theme.palette.dark.main}/>
            </Box>
              <Text tAlign={'center'} fSize={'large'} fWeight={'bold'}>Oops... currently not available</Text>
              <Box display={'flex'} justifyContent={'center'} marginTop={theme.sizes.gutters[4]}>
                <Button onClick={handleModalToggle} color={'secondary'} size={'sm'} rounded>ok, close it</Button>
              </Box></>}
        </ModalContent>
      </Modal>
    </Container>
  );
};

RegisteredQual.propTypes = {
  theme: PropTypes.any
}
RegisteredModules.propTypes = {
  theme: PropTypes.any.isRequired,
  handleViewInfo: PropTypes.func.isRequired,
}

export default Registration;