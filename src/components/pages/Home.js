import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import {MdAdminPanelSettings, MdCalendarToday, MdClose, MdPushPin} from "react-icons/md";
import {useDataContext} from "../../hooks/context";
import Button from "../elements/Button";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../elements/Table";
import Text from "../elements/Text";
import Box from "../layouts/Box";
import Card from "../layouts/Card";
import Chip from "../layouts/Chip";
import Collapsible from "../layouts/Collapsible";
import Container from "../layouts/Container";
import Grid, {GridCell} from "../layouts/Grid";
import Modal, {ModalContent, ModalHeader} from "../layouts/Modal";
import Skeleton from "../layouts/Skeletons";
import TabContext, {Tab, TabContent, Tabs} from "../layouts/Tabs";
import {caseOut} from "./self/IEnabler";

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
          <Box display={'flex'} marginTop={theme.sizes.gutters[4]}>
            {announcement.user &&
            <Box marginRight={theme.sizes.gutters[1]}>
              <Chip avatar={announcement.user.toLowerCase() === "mpilo" ? <MdAdminPanelSettings size={'.75rem'}/> :
                <Text fSize={'.75rem'}>🤷‍♂️</Text>} text={announcement.user} textSize={'.7rem'}/>
            </Box>}
            {announcement.pinned &&
            <Box marginRight={theme.sizes.gutters[1]}>
              <Chip avatar={<MdPushPin size={'.75rem'}/>} text={'pinned'} textSize={'.7rem'}/>
            </Box>}
            {<Chip avatar={<MdCalendarToday size={'.75rem'}/>} text={announcement.date} textSize={'.7rem'}/>}
          </Box>
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

const AnnouncementLoader = () => {
  return (
    <>
      <Box marginBottom={'1rem'}>
        <TabContext>
          <Tabs isFixed>
            <Tab value={'latest'}>latest</Tab>
            <Tab value={'previous'}>previous</Tab>
          </Tabs>
        </TabContext>
      </Box>
      <Card>
        <Skeleton skeletonType={'header'}/>
        <Box marginBottom={'1.5rem'}/>
        <Skeleton style={{width: '90%'}} skeletonType={'text'}/>
        <Skeleton style={{width: '80%'}} skeletonType={'text'}/>
        <Skeleton style={{width: '65%'}} skeletonType={'text'}/>
        <Box display={'flex'} margin={'1rem 0'}>
          <Skeleton style={{width: '70px', borderRadius: '9999rem', marginRight: '.5rem'}} skeletonType={'text'}/>
          <Skeleton style={{width: '65px', borderRadius: '9999rem', marginRight: '.5rem'}} skeletonType={'text'}/>
          <Skeleton style={{width: '80px', borderRadius: '9999rem', marginRight: '.5rem'}} skeletonType={'text'}/>
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Skeleton style={{
            width: '95px',
            height: '1.25rem',
            marginRight: '.5rem',
            borderRadius: '9999rem'
          }} skeletonType={'text'}/>

          <Skeleton style={{
            width: '100px',
            height: '1.25rem',
            marginRight: '.5rem',
            borderRadius: '9999rem'
          }} skeletonType={'text'}/>
        </Box>
      </Card>
      {[1, 2, 3, 4].map(a => (
        <Box key={a} margin={'1rem 0'}>
          <Card>
            <Skeleton style={{width: `75%`}} skeletonType={'header'}/>
          </Card>
        </Box>
      ))}
    </>
  )
}

const Announcements = () => {
  const data = useDataContext()
  const announcements = [...data.announcements.sort((aa, ab) => {
    if (aa.pinned && ab.pinned) {
      return ab.importantScore - aa.importantScore
    } else if (aa.pinned) {
      return -1
    } else if (ab.pinned) {
      return 1
    } else {
      return ab.importantScore - aa.importantScore
    }
  })]
  const [showMore, setShowMore] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const theme = useTheme()

  const showMoreToggle = () => {
    setShowMore(!showMore)
    setTimeout(() => {
      setLoaded(true)
    }, 2500)
  }
  return (
    <>
      {announcements.filter(a => a.active).slice(0, 5).map((announcement, idx) => {
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
          {loaded ? <TabContext>
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
          </TabContext> : <AnnouncementLoader/>}
        </ModalContent>
      </Modal>
    </>
  )
}

const Home = () => {
    const [openAds, setOpenAds] = useState(false)
    const {ads} = useDataContext()
    const theme = useTheme()

    const handleOpenAdsToggle = () => {
      setOpenAds(!openAds)
    }
    return (
      <Container maxWidth='xl' navPadding>
        <Grid gridSpacing={2}>
          <GridCell colsLg={7} colsXl={8}>
            <Card>
              <Text fSize={'1.25rem'} fWeight={'bold'}>Latest Ads</Text>
              <Box marginTop={theme.sizes.gutters[3]}>
                <Button onClick={handleOpenAdsToggle}>show all ads</Button>
              </Box>
            </Card>
          </GridCell>
          <GridCell colsLg={5} colsXl={4}>
            <Text fSize={'1.25rem'} fWeight={'bold'}>Announcements</Text>
            <Announcements/>
          </GridCell>
        </Grid>
        <Modal open={openAds} onClose={handleOpenAdsToggle} maxWidth={'lg'} scrollOverlay={false}>
          <ModalHeader text={'Latest Ads'} onCloseClick={handleOpenAdsToggle}/>
          <ModalContent>
            <Table responsive capHead captionText={'Latest Ads'} captionSide={'bottom'} headColor={'secondary'}
                   tableSize={'lg'} bordered>
              <THead>
                <TableRow>
                  {Object.keys(ads[0])?.map((key, idx) => {
                    if (key.toLowerCase() !== 'id' && key.toLowerCase() !== 'postedby' && key.toLowerCase() !== 'email') {
                      return <TableHead key={idx}>{caseOut(key)}</TableHead>
                    }
                  })}
                  <TableHead>Action</TableHead>
                </TableRow>
              </THead>
              <TBody>
                {ads.slice(0, 10).map((ad) => {
                  return (<TableRow key={ad.id}>
                    {
                      Object.keys(ad).map((key, idx) => {
                        if (key.toLowerCase() !== 'id' && key.toLowerCase() !== 'postedby' && key.toLowerCase() !== 'email') {
                          return <TableData key={idx}>{ad[key]}</TableData>
                        }
                      })
                    }
                    <TableData><Button size={'sm'} rounded color={'info'}>view add</Button></TableData>
                  </TableRow>)
                })}
              </TBody>
            </Table>
          </ModalContent>
        </Modal>
      </Container>
    );
  }
;


Announcement.propTypes =
  {
    announcement: PropTypes.object,
    theme: PropTypes.any,
    collapsed: PropTypes.bool,
  }

export default Home;