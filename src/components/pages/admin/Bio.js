import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React from 'react';
import {FaFrown} from "react-icons/fa";
import {useMediaQuery} from "react-responsive";
import {useDataContext} from "../../../hooks/context";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Container from "../../layouts/Container";
import Grid, {GridCell} from "../../layouts/Grid";
import TabContext, {Tab, TabContent, Tabs} from "../../layouts/Tabs";
import {caseOut} from "../self/IEnabler";

const PersonalDetails = ({data}) => {
  const {student} = data

  return (
    <Grid justifyGrid={'center'}>
      {Object.keys(student).map((key, idx) => {
        if (key.toLowerCase() !== "contacts") {
          return (
            <React.Fragment key={idx}>
              <GridCell colsSm={6}>
                <Box padding={'.75rem .25rem'}>
                  <Text fWeight={'bold'} fSize={'.85em'}
                        tColor={"grey"}>{caseOut(key).toUpperCase()}</Text>
                </Box>
              </GridCell>
              <GridCell colsSm={6}>
                <Box padding={'.75rem .25rem'}>
                  <Text fSize={'.85em'}>{student[key]}</Text>
                </Box>
              </GridCell>
            </React.Fragment>
          )
        }
      })}
    </Grid>
  )
}

const Contacts = ({data, theme}) => {
  const {contacts} = data.student
  return (
    <Grid justifyGrid={'center'}>
      {Object.keys(contacts).map((key, idx) => {
        if (key.toLowerCase() !== "contacts") {
          return (
            <React.Fragment key={idx}>
              <GridCell colsSm={6}>
                <Box padding={'.75rem .25rem'}>
                  <Text fWeight={'bold'} fSize={'.85em'}
                        tColor={"grey"}>{caseOut(key).toUpperCase()}</Text>
                </Box>
              </GridCell>
              <GridCell colsSm={6}>
                <Box padding={'.75rem .25rem'}
                     style={{
                       borderRadius: theme.sizes.radius.sm,
                       maxWidth: 'calc(100%)',
                     }}>
                  <Text style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }} fSize={'.85em'}>{contacts[key]}</Text>
                </Box>
              </GridCell>
            </React.Fragment>
          )
        }
      })}
    </Grid>
  )

}

const NoData = ({theme, title}) => {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} marginTop={theme.sizes.gutters[4]}
           marginBottom={theme.sizes.gutters[4]}>
        <FaFrown color={theme.color.secondary} size={172}/>
      </Box>
      <Text tColor={theme.color.secondary} fSize={"x-large"} fWeight={"700"} tAlign={"center"}>
        {title} data not available
      </Text>
    </>
  )
}

const Bio = () => {
  const theme = useTheme()
  const data = useDataContext()
  const isLg = useMediaQuery({minWidth: theme.breakpoints.lg})
  return (
    <Container maxWidth={'lg'}>
      <Card style={{marginTop: theme.sizes.gutters[4]}}>
        <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[3]}>
          <Text fSize={'large'} fWeight={'bold'} tAlign={'center'}>Your Biographical Details</Text>
        </Box>
        <TabContext>
          <Tabs isFixed={isLg}>
            <Tab value={'details'}>Personal Details</Tab>
            <Tab value={'matric'}>Matric Data</Tab>
            <Tab value={'contacts'}>Contacts</Tab>
            <Tab value={'kin'}>Next of Kin</Tab>
            <Tab value={'exam'}>Exam centers</Tab>
            <Tab value={'holds'}>Active Hold</Tab>
          </Tabs>
          <Container maxWidth={'md'} style={{padding: 0}}>
            <TabContent value={'details'}><PersonalDetails data={data}/></TabContent>
            <TabContent value={'matric'}><NoData title={'Matric'} theme={theme}/></TabContent>
            <TabContent value={'contacts'}><Contacts data={data} theme={theme}/></TabContent>
            <TabContent value={'kin'}><NoData title={'Next of Kin'} theme={theme}/></TabContent>
            <TabContent value={'exam'}><NoData title={'Exam centers'} theme={theme}/></TabContent>
            <TabContent value={'holds'}><NoData title={'Active Holds'} theme={theme}/></TabContent>
          </Container>
        </TabContext>
      </Card>
    </Container>
  );
};

PersonalDetails.propTypes = {
  data: PropTypes.object.isRequired,
}

Contacts.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.any.isRequired,
}

NoData.propTypes = {
  theme: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
}

export default Bio;