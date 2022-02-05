import {useTheme} from "@emotion/react";
import React, {useState} from 'react';
import {useDataContext} from "../../hooks/context";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Box from "../layouts/Box";
import Card from "../layouts/Card";
import Container from "../layouts/Container";
import Grid, {GridCell} from "../layouts/Grid";

const Announcements = () => {
  const data = useDataContext()
  const announcements = [...data.announcements]
  const theme = useTheme()
  const handleOpen = (id) => {
    const a = announcements.find(a => a.id === id)
    setAnn(a)
  }
  return (
    <>
      {announcements.sort((aa, ab) => aa.importantScore < ab.importantScore) .map((a, idx) => {
        return (
          <div onClick={() => handleOpen(a.id)} key={idx}>
            <Card>
              <Text fWeight={'500'}>{a.title}</Text>
              <Box marginTop={theme.sizes.gutters[2]}>
                <Text tAlign={'end'} fSize={'xx-small'} tColor={'#888'}>{a.date}</Text>
              </Box>
            </Card>
          </div>
        )
      })}
    </>
  )
}

const Home = () => {
    const theme = useTheme()
    return (
      <Container maxWidth='xl'>
        <Grid gridSpacing={2}>
          <GridCell colsLg={7} colsXl={8}>
            <Card>
              <Text fSize={theme.typography.fontsize.lg} fWeight={'bold'}>Latest Ads</Text>
            </Card>
          </GridCell>
          <GridCell colsLg={5} colsXl={4}>
            <Card shadow={false}>
              <Text fSize={theme.typography.fontsize.lg} fWeight={'bold'}>Announcements</Text>
              <Announcements/>
              <Box marginTop={theme.sizes.gutters[4]}>
                <Button color={"primary"} size={'sm'} rounded block>Load more</Button>
              </Box>
            </Card>
          </GridCell>
        </Grid>
      </Container>
    );
  }
;

export default Home;