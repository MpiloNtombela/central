import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React from 'react';
import {NAV_HEIGHT} from "../../elements/Navbar";
import Box from "../../layouts/Box";
import Card from "../../layouts/Card";
import Collapsible from "../../layouts/Collapsible";
import Container from "../../layouts/Container";
import Drawer, {DrawerContainer} from "../../layouts/Drawer";
import Grid, {GridCell} from "../../layouts/Grid";
import Skeleton from "../../layouts/Skeletons";

const IEnablerLoader = ({drawerOpen = false, drawerAnchor = "left", fixed, drawerWidth}) => {
  const theme = useTheme()

  return (
    <DrawerContainer drawerFixed={fixed} drawerAnchor={drawerAnchor} drawerWidth={drawerWidth} drawerOpen={drawerOpen}>
      {drawerOpen &&
      <Drawer onClose={() => {
      }} open={drawerOpen} width={drawerWidth} fixed={fixed} elevation={2} anchor={drawerAnchor}>
        <Box marginTop={'1rem'} paddingTop={fixed ? `${NAV_HEIGHT}rem` : 'unset'}>
          {[1, 2, 3, 4, 5].map((num) => {
            if (num === 1 || num === 3) {
              return (
                <Collapsible collapsed bgColor={theme.background.main} header={
                  <Grid>
                    <GridCell colsSm={2}>
                      <Skeleton skeletonType={'avatar'}
                                style={{
                                  height: '1.25rem',
                                  width: '1.25rem',
                                  background: theme.background.secondary
                                }}/>
                    </GridCell>
                    <GridCell colsSm={10}>
                      <Skeleton skeletonType={'text'}
                                style={{height: '1.25rem', background: theme.background.secondary}}/>
                    </GridCell>
                  </Grid>} key={num}>
                  {[1, 2, 3].map((num) => (
                    <Box key={num} padding={'.15rem .5rem .2rem  1rem'}>
                      <Grid>
                        <GridCell colsSm={2}>
                          <Skeleton skeletonType={'avatar'}
                                    style={{
                                      height: '1.25rem',
                                      width: '1.25rem',
                                      background: theme.background.secondary
                                    }}/>
                        </GridCell>
                        <GridCell colsSm={10}>
                          <Skeleton skeletonType={'text'}
                                    style={{height: '1.25rem', background: theme.background.secondary}}/>
                        </GridCell>
                      </Grid>
                    </Box>
                  ))}
                </Collapsible>
              )
            } else {
              return (<Box key={num} padding={'.15rem .5rem'}>
                <Grid>
                  <GridCell colsSm={2}>
                    <Skeleton skeletonType={'avatar'}
                              style={{height: '1.25rem', width: '1.25rem', background: theme.background.secondary}}/>
                  </GridCell>
                  <GridCell colsSm={10}>
                    <Skeleton skeletonType={'text'}
                              style={{height: '1.25rem', background: theme.background.secondary}}/>
                  </GridCell>
                </Grid>
              </Box>)
            }
          })}
        </Box>
      </Drawer>}
      <Container maxWidth="xl">
        <Box marginTop={theme.sizes.gutters[1]}>
          <Grid gridSpacing={2} alignGrid={'center'} justifyGrid={'center'}>
            {[1, 2, 3].map((num) => (
              <GridCell key={num} colsSm={4}>
                <Skeleton skeletonType={'text'}
                          style={{height: '1.75rem', background: theme.background.secondary}}/>
              </GridCell>
            ))}
          </Grid>
        </Box>
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
                      <Skeleton style={{
                        width: num % 2 !== 0 ?
                          num === 3 || num === 7 ?
                            "30%" : '60%'
                          : '85%'
                      }} skeletonType="text"/>
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
                      <Skeleton style={{width: num % 2 !== 0 ? '60%' : '100%'}} skeletonType="text"/>
                    </GridCell>
                  ))}
                </Grid>
              </Box>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Skeleton skeletonType={'header'} style={{borderRadius: '9999rem', height: '2.25rem', width: '150px'}}/>
              </Box>
            </Card>
            <Box margin={`${theme.sizes.gutters[2]} auto`}>
              <Card>
                <Box padding={`${theme.sizes.gutters[2]} 0`}>
                  <Skeleton skeletonType={'header'}/>
                  <Box marginTop={theme.sizes.gutters[2]} display="flex" justifyContent="flex-end">
                    <Skeleton skeletonType='text' style={{width: "100px"}}/>
                  </Box>
                </Box>
              </Card>
            </Box>
          </GridCell>
        </Grid>
      </Container>
    </DrawerContainer>
  );
};

IEnablerLoader.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  fixed: PropTypes.bool.isRequired,
  drawerAnchor: PropTypes.oneOf(["top", "left", "bottom", "right"]),
  drawerWidth: PropTypes.number.isRequired,
}

export default IEnablerLoader;