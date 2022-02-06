import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import {MdClose, MdPushPin} from "react-icons/md";
import {useDataContext} from "../../hooks/context";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Box from "../layouts/Box";
import Card from "../layouts/Card";
import Collapsible from "../layouts/Collapsible";
import Container from "../layouts/Container";
import Grid, {GridCell} from "../layouts/Grid";
import Modal, {ModalContent, ModalHeader} from "../layouts/Modal";
import TabContext, {Tab, TabContent, Tabs} from "../layouts/Tabs";

const Announcement = ({announcement, theme, collapsed}) => {
  return (
    <Box margin={`${theme.sizes.gutters[2]} 0`}>
      <Card>
        <Collapsible
          collapsed={collapsed}
          isHighlighted={false}
          header={<Text style={{textTransform: 'capitalize'}} fWeight={'500'}>
            {announcement.title} {announcement.pinned && <MdPushPin color={theme.color.secondary}/>}</Text>}>
          <Text fSize={theme.typography.fontsize.paragraph}
                tColor={theme.color.secondary}>{announcement?.content}</Text>
          {announcement?.actions.length > 0 &&
          <Box display={'flex'} justifyContent={'flex-end'} marginTop={theme.sizes.gutters[4]}>
            {announcement?.actions.map((action, idx) => {
              return (
                <Box key={idx} marginLeft={theme.sizes.gutters[2]}>
                  {action.type === 'link' ?
                    <a style={{
                      fontWeight: '700',
                      fontSize: 'small',
                      textTransform: 'uppercase',
                      color: theme.palette.primary.main
                    }}
                       href={action.destination}>{action.name}</a> :
                    <Button size={'sm'} outlined={!action.important} rounded>{action.name}</Button>}
                </Box>)
            })}
          </Box>}
        </Collapsible>
      </Card>
    </Box>
  )
}

Announcement.propTypes = {
  announcement: PropTypes.object,
  theme: PropTypes.any,
  collapsed: PropTypes.bool,
}

const Announcements = () => {
  const data = useDataContext()
  const announcements = [...data.announcements]
  const [showMore, setShowMore] = useState(false)
  const theme = useTheme()

  const showMoreToggle = () => {
    setShowMore(!showMore)
  }
  return (
    <>
      {announcements.filter(a => a.active).sort((aa, ab) => {
        if (aa.pinned && ab.pinned) {
          return ab.importantScore - aa.importantScore
        } else if (aa.pinned) {
          return -1
        } else if (ab.pinned) {
          return 1
        } else {
          return ab.importantScore - aa.importantScore
        }
      }).slice(0, 5).map((announcement, idx) => {
        return (
          <Announcement key={announcement.id} announcement={announcement} collapsed={idx === 0} theme={theme}/>
        )
      })}
      <Box marginTop={theme.sizes.gutters[4]}>
        <Button onClick={showMoreToggle} color={"primary"} size={'sm'} rounded block>show more</Button>
      </Box>
      <Modal open={showMore} onClose={showMoreToggle} maxWidth={'md'} rounded={"md"} elevation={2}>
        <ModalHeader closeIcon={<MdClose size={24}/>} text={"Announcements"} elevation={4}
                     onCloseClick={showMoreToggle}/>
        <ModalContent>
          <TabContext>
            <Tabs isFixed>
              <Tab value={'latest'}>latest</Tab>
              <Tab value={'previous'}>previous</Tab>
            </Tabs>
            <TabContent value={'latest'}>
              {announcements.filter(a => a.active).map((announcement, idx) => {
                return (
                  <Announcement key={announcement.id} announcement={announcement} collapsed={idx === 0} theme={theme}/>
                )
              })}
            </TabContent>
            <TabContent value={'previous'}>
              {announcements.filter(a => !a.active).map((announcement, idx) => {
                return (
                  <Announcement key={announcement.id} announcement={announcement} collapsed={idx === 0} theme={theme}/>
                )
              })}
            </TabContent>
          </TabContext>
        </ModalContent>
      </Modal>
    </>
  )
}

const Home = () => {
    return (
      <Container maxWidth='xl' navPadding>
        <Grid gridSpacing={2}>
          <GridCell colsLg={7} colsXl={8}>
            <Card>
              <Text fSize={'1.25rem'} fWeight={'bold'}>Latest Ads</Text>
            </Card>
          </GridCell>
          <GridCell colsLg={5} colsXl={4}>
            <Text fSize={'1.25rem'} fWeight={'bold'}>Announcements</Text>
            <Announcements/>
          </GridCell>
        </Grid>
      </Container>
    );
  }
;

export default Home;