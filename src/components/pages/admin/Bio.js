import React from 'react';
import Text from "../../elements/Text";
import Container from "../../layouts/Container";
import TabContext, {Tab, TabContent, Tabs} from "../../layouts/Tabs";

const Bio = () => {
  return (
    <Container maxWidth={'xl'}>
      <TabContext>
        <Tabs>
          <Tab value={'details'}>Details</Tab>
          <Tab value={'matric'}>Matric Data</Tab>
          <Tab value={'contacts'}>Contacts</Tab>
          <Tab value={'kin'}>Next of Kin</Tab>
          <Tab value={'exam'}>Exam centers</Tab>
          <Tab value={'holds'}>Active Hold</Tab>
        </Tabs>
        <TabContent value={'details'}><Text>Details</Text></TabContent>
        <TabContent value={'matric'}><Text>Matric Data</Text></TabContent>
        <TabContent value={'contacts'}><Text>Contacts</Text></TabContent>
        <TabContent value={'kin'}><Text>Next of Kin</Text></TabContent>
        <TabContent value={'exam'}><Text>Exam Details</Text></TabContent>
        <TabContent value={'holds'}><Text>Active hold</Text></TabContent>
      </TabContext>
    </Container>
  );
};

export default Bio;