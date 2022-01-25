import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React from 'react';
import {useMediaQuery} from "react-responsive";
import Text from "../../elements/Text";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Container from "../../layouts/Container";
import Drawer, {DrawerContainer} from "../../layouts/Drawer";
import Grid, {GridCell} from "../../layouts/Grid";
import Skeleton from "../../layouts/Skeletons";

const IEnablerLoader = ({drawerOpen = false}) => {
  const theme = useTheme()

  return (
    <DrawerContainer drawerFixed drawerAnchor={"left"} drawerWidth={210} drawerOpen={drawerOpen}>
      <Drawer onClose={() => {
      }} open={drawerOpen} width={210} elevation={2}>
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
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Skeleton skeletonType={'header'} style={{borderRadius: '9999rem', height: '2.25rem', width: '150px'}}/>
              </Box>
            </Card>
            <Card>
              <Box padding={`${theme.sizes.gutters[2]} 0`}>
                <Skeleton skeletonType={'header'}/>
                <Box marginTop={theme.sizes.gutters[2]} display="flex" justifyContent="flex-end">
                  <Skeleton skeletonType='text' style={{width: "100px"}}/>
                </Box>
              </Box>
            </Card>
          </GridCell>
        </Grid>
      </Container>
    </DrawerContainer>
  );
};

IEnablerLoader.propTypes = {
  drawerOpen: PropTypes.bool
}

export default IEnablerLoader;