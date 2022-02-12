import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import {MdAdminPanelSettings, MdCalendarToday, MdClose, MdPushPin} from "react-icons/md";
import {useMediaQuery} from "react-responsive";
import {useImmer} from "use-immer";
import {useDataContext} from "../../hooks/context";
import Button from "../elements/Button";
import Table, {TableData, TableHead, TableRow, TBody, THead} from "../elements/Table";
import Text from "../elements/Text";
import Box from "../layouts/Box";
import Card from "../layouts/Card";
import Chip from "../layouts/Chip";
import Collapsible from "../layouts/Collapsible";
import Container from "../layouts/Container";
import Drawer from "../layouts/Drawer";
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

const Announcements = React.memo(function Announcements() {
  const data = useDataContext()
  const announcements = [...data.announcements]
  announcements.sort((aa, ab) => {
    if (aa.pinned && ab.pinned) {
      return ab.importantScore - aa.importantScore
    } else if (aa.pinned) {
      return -1
    } else if (ab.pinned) {
      return 1
    } else {
      return ab.importantScore - aa.importantScore
    }
  })
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
      {showMore && <Modal open={showMore} onClose={showMoreToggle} maxWidth={'md'} rounded={"md"} elevation={2}>
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
      </Modal>}
    </>
  )
})

const AllAds = ({ads, openAds, handleClose}) => {
  return (
    <Modal open={openAds} onClose={handleClose} maxWidth={'lg'} scrollOverlay={false}>
      <ModalHeader sticky text={'Latest Ads'} onCloseClick={handleClose}/>
      <ModalContent>
        <Table responsive isHover capHead captionText={`${ads.length} of ${ads.length} ads`} captionSide={'bottom'}
               headColor={'secondary'}
               tableSize={'lg'} bordered>
          <THead>
            <TableRow>
              {Object.keys(ads[0])?.map((key, idx) => {
                if (key.toLowerCase() !== 'id' && key.toLowerCase() !== 'postedby' && key.toLowerCase() !== 'email') {
                  return <TableHead key={idx}>{caseOut(key)}</TableHead>
                }
              })}
            </TableRow>
          </THead>
          <TBody>
            {ads.map((ad) => {
              return (<TableRow key={ad.id}>
                {
                  Object.keys(ad).map((key, idx) => {
                    if (key.toLowerCase() !== 'id' && key.toLowerCase() !== 'postedby' && key.toLowerCase() !== 'email') {
                      return <TableData key={idx}>{ad[key]}</TableData>
                    }
                  })
                }
              </TableRow>)
            })}
          </TBody>
        </Table>
      </ModalContent>
    </Modal>
  )
}

const Ad = ({ad, theme}) => {
  return (
    <Box padding={theme.sizes.gutters[3]}>
      <Text fSize={'medium'} fWeight={'bold'} tColor={theme.palette.info.main}>{ad.title}</Text>
      <Box marginTop={theme.sizes.gutters[2]} marginBottom={theme.sizes.gutters[4]}>
        <Grid>
          {Object.keys(ad).map((key, idx) => {
            if (key.toLowerCase() !== 'id' && key.toLowerCase() !== 'title') {
              return (
                <React.Fragment key={idx}>
                  <GridCell colsSm={6} colsMd={5}>
                    <Box margin={'.5rem 0'}>
                      <Text fWeight={'bold'} fSize={'.85em'}
                            tColor={"grey"}>{caseOut(key).toUpperCase()}</Text>
                    </Box>
                  </GridCell>
                  <GridCell colsSm={6} colsMd={7}>
                    <Box margin={'.5rem 0'}>
                      <Text fSize={'.85em'}>{ad[key]}</Text>
                    </Box>
                  </GridCell>
                </React.Fragment>
              )
            }
          })}
        </Grid>
      </Box>
      <Button color={'danger'} rounded block size={'sm'}>report ad</Button>
    </Box>
  )
}

const Home = () => {
  const {ads} = useDataContext()
  const theme = useTheme()
  const isSm = useMediaQuery({maxWidth: theme.breakpoints.sm})
  const [openAds, setOpenAds] = useState(false)
  const [openedAd, setOpenedAd] = useImmer({
    ad: null,
    isLoading: true,
    open: false,
  })


  const handleOpenAd = (id) => {
    if (openedAd?.ad?.id === id) {
      setOpenedAd(draft => {
        draft.open = true
        draft.isLoading = false
      })
    } else {
      setOpenedAd(draft => {
        draft.open = true
        draft.isLoading = true
      })
      const ad = ads.find(a => a.id === id)
      setTimeout(() => {
        if (ad) {
          setOpenedAd(draft => {
            draft.ad = ad
            draft.isLoading = false
          })
        } else {
          setOpenedAd(draft => {
            draft.ad = null
            draft.isLoading = false
          })
        }
      }, 2000)
    }
  }

  const handleCloseAd = () => {
    setOpenedAd(draft => {
      draft.open = false
    })
  }

  const handleOpenAdsToggle = () => {
    setOpenAds(!openAds)
  }

  return (
    <Container maxWidth='xl' navPadding>
      <Grid gridSpacing={2}>
        <GridCell colsLg={7} colsXl={8}>
          <Card>
            <Table striped isHover capHead captionText={`10 of ${ads.length} ads`} captionSide={'bottom'}
                   headColor={'secondary'}
                   tableSize={'lg'}>
              <THead>
                <TableRow>
                  <TableHead>Latest Ads</TableHead>
                </TableRow>
              </THead>
              <TBody>
                {ads.slice(0, 10).map((ad) => {
                  return (
                    <TableRow key={ad.id} onClick={() => handleOpenAd(ad.id)}>
                      <TableData>{ad.title}</TableData>
                    </TableRow>)
                })}
              </TBody>
            </Table>
            <Box display={'flex'} justifyContent={'flex-end'} marginTop={theme.sizes.gutters[4]}>
              <Button size={'sm'} rounded onClick={handleOpenAdsToggle}>show all ads</Button>
            </Box>
          </Card>
        </GridCell>
        <GridCell colsLg={5} colsXl={4}>
          <Text fSize={'1.25rem'} fWeight={'bold'}>Announcements</Text>
          <Announcements/>
        </GridCell>
      </Grid>
      {openAds && <AllAds handleClose={handleOpenAdsToggle} openAds={openAds} ads={ads}/>}
      <Drawer rounded={isSm} height={isSm ? '60%' : '100%'} width={isSm ? '100%' : 300} onClose={handleCloseAd}
              open={openedAd.open}
              anchor={isSm ? 'bottom' : 'right'}>
        {openedAd.isLoading ?
          <Text fSize={'medium'} fWeight={'bold'}>Loading...</Text>
          : openedAd.ad ? <Ad ad={openedAd.ad} theme={theme}/>
            : <Text fSize={'medium'} fWeight={'bold'}>Ad not found</Text>
        }
      </Drawer>
    </Container>
  );
}


Announcement.propTypes = {
  announcement: PropTypes.object,
  theme: PropTypes.any,
  collapsed: PropTypes.bool,
}

AllAds.propTypes = {
  ads: PropTypes.array.isRequired,
  openAds: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

Ad.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    postedBy: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
  theme: PropTypes.any
}

export default Home;