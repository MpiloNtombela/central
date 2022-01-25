import {useTheme} from "@emotion/react";
import React from 'react';
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Container from "../../layouts/Container";
import Drawer, {DrawerContainer} from "../../layouts/Drawer";
import Grid, {GridCell} from "../../layouts/Grid";
import Skeleton from "../../layouts/Skeletons";

const IEnablerLoader = () => {
  const theme = useTheme()
  return (
    <DrawerContainer drawerFixed drawerAnchor={"left"} drawerWidth={200} drawerOpen={true}>
      <Drawer onClose={() => {
      }} open={true} width={200} elevation={2}>
        <Box marginTop={'1rem'}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <Box key={num} padding={'.2rem .5rem'}>
              <Skeleton skeletonType={'text'} style={{height: '1.75rem', background: theme.background.secondary}}/>
            </Box>
          ))}
        </Box>
      </Drawer>
      <Container maxWidth="lg">
        <Grid gridSpacing={2}>
          <GridCell colsMd={6} colsLg={7}>
            <Card>
              <Skeleton skeletonType="header"/>
              <Box marginTop={'1.25rem'} marginBottom={'1.25rem'}>
                <Grid gridSpacing={2} alignGrid={'center'}>
                  <GridCell colsSm={4} colsMd={4} colsLg={2}>
                    <Skeleton skeletonType={'avatar'} skeletonSize={3}/>
                  </GridCell>
                  <GridCell colsSm={8} colsMd={8} colsLg={8}>
                    <Skeleton skeletonType="text"/>
                    <Skeleton skeletonType="text"/>
                  </GridCell>
                </Grid>
              </Box>
              <Box marginTop={'.75rem'}>
                <Grid gridSpacing={2}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <GridCell key={num} colsSm={6}>
                      <Skeleton skeletonType="text"/>
                    </GridCell>
                  ))}
                </Grid>
              </Box>
            </Card>
          </GridCell>
          <GridCell colsMd={6} colsLg={5}>
            <Card>
              <Skeleton skeletonType="header"/>
              <Box marginTop={'1.25rem'} marginBottom={"1.75rem"}>
                <Grid gridSpacing={2}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <GridCell key={num} colsSm={6}>
                      <Skeleton skeletonType="text"/>
                    </GridCell>
                  ))}
                </Grid>
              </Box>
              <Box width={"65%"}>
                <Skeleton skeletonType={'header'} style={{borderRadius: '9999rem', height: '2.25rem'}}/>
              </Box>
            </Card>
          </GridCell>
        </Grid>
      </Container>
    </DrawerContainer>
  );
};

export default IEnablerLoader;