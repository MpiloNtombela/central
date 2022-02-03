import {useTheme} from "@emotion/react";
import React from 'react';
import Text from "../elements/Text";
import Card from "../layouts/Card";
import Container from "../layouts/Container";
import Grid, {GridCell} from "../layouts/Grid";

const Home = () => {
  const theme = useTheme()
  return (
    <Container maxWidth='xl'>
      <Grid gridSpacing={2}>
        <GridCell colsMd={7} colsXl={8}>
          <Card>
            <Text fSize={theme.typography.fontsize.md} fWeight={'bold'}>Latest Ads</Text>
          </Card>
        </GridCell>
        <GridCell colsMd={5} colsXl={4}>
          <Card>
            <Text fSize={theme.typography.fontsize.md} fWeight={'bold'}>Announcements</Text>
          </Card>
        </GridCell>
      </Grid>
    </Container>
  );
};

export default Home;