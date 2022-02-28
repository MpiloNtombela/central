import {useTheme} from "@emotion/react";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import {MdAdminPanelSettings, MdCalendarToday, MdCelebration, MdClose, MdPushPin} from "react-icons/md";
import {useMediaQuery} from "react-responsive";
import {useMatch, useNavigate} from "react-router-dom";
import {useImmer} from "use-immer";
import {useDataContext, useDataDispatch} from "../../hooks/context";
import {useGetSubPath} from "../../hooks/routes";
import {SETUP_ALERT} from "../DataContext";
import Anchor from "../elements/Anchor";
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
import Loader from "../layouts/Loader";
import Modal, {ModalContent, ModalHeader} from "../layouts/Modal";
import Skeleton from "../layouts/Skeletons";
import TabContext, {Tab, TabContent, Tabs} from "../layouts/Tabs";
import {caseOut} from "./self/IEnabler";
import {selfHelp} from "./utils/mainRoutes";

const Announcement = ({announcement, theme, collapsed}) => {

  const dispatch = useDataDispatch()

  const handleMessage = (message) => {
    dispatch({
      type: SETUP_ALERT,
      payload: {
        message: message,
        status: 'info'
      }
    })
  }

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
                      <Anchor
                        style={{
                          fontWeight: '700',
                          fontSize: 'small',
                          textTransform: 'uppercase',
                          color: theme.palette.primary.main
                        }}
                        href={action.destination}
                        target='_blank'>
                        {action.name}
                      </Anchor> :
                      <Button size={'sm'} onClick={() => {
                        action.message && handleMessage(action.message)
                      }} outlined={!action.important}
                              rounded>{action.name}</Button>}
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
          <Announcement key={idx} announcement={announcement} collapsed={idx === 0} theme={theme}/>
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
                  <Announcement key={idx} announcement={announcement} collapsed={idx === 0} theme={theme}/>
                )
              })}
            </TabContent>
            <TabContent value={'previous'}>
              {announcements.filter(a => !a.active).map((announcement, idx) => {
                return (
                  <Announcement key={idx} announcement={announcement} collapsed={idx === 0} theme={theme}/>
                )
              })}
            </TabContent>
          </TabContext> : <AnnouncementLoader/>}
        </ModalContent>
      </Modal>}
    </>
  )
})

const AllAds = ({ads, openAds, handleClose, isSm, handleAdClick}) => {
  return (
    <Modal open={openAds} onClose={handleClose} maxWidth={'lg'} scrollOverlay={isSm}>
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
            {ads.map((ad, idx) => {
              return (<TableRow key={idx} onClick={() => handleAdClick(ad.id)}>
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
  const message = `mailto:${ad.email}?subject=${ad.title} ad&body=Hi ${ad.postedBy}%0d%0a%0d%0aI saw '${ad.title}' Ad and I'm interested in it, if it still available.`
  return (
    <>
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
                      {key.toLowerCase() === 'price' && <Text fSize={'.85em'}>R {ad[key]}</Text>}
                      {key.toLowerCase() === 'email' && <Text fSize={'.85em'}>
                        <a
                          style={{color: theme.palette.primary.main, fontWeight: 500}}
                          href={message}>
                          {ad[key]}
                        </a>
                      </Text>}
                      {key.toLowerCase() !== 'email' && key.toLowerCase() !== 'price' &&
                        <Text fSize={'.85em'}>{ad[key]}</Text>}
                    </Box>
                  </GridCell>
                </React.Fragment>
              )
            }
          })}
        </Grid>
      </Box>
      <Anchor
        color={'secondary'}
        renderButton
        block
        rounded
        size={'sm'}
        href={message}>
        email {ad.postedBy}
      </Anchor>
      <Box marginTop={theme.sizes.gutters[2]}>
        <Button outlined color={'danger'} rounded block size={'sm'}>report ad</Button>
      </Box>
    </>
  )
}

const Exclusion = ({open}) => {
  const [show, setShow] = useState(open)
  const [checking, setChecking] = useState(true)
  const theme = useTheme()
  const navigation = useNavigate()
  const handleClose = () => {
    setShow(false)
    navigation('/')
  }
  useEffect(() => {
    // simulating data fetching
    setTimeout(() => {
      setChecking(false)
    }, 3000)
  }, [])

  return (
    <Modal open={show} onClose={{}} isStatic centerVert rounded={'md'}>
      <ModalContent>
        {checking ?
          <Box paddingTop={theme.sizes.gutters[4]} paddingBottom={theme.sizes.gutters[4]}>
            <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[4]}
                 style={{height: '2rem'}}>
              <Loader/>
            </Box>
            <Box marginTop={theme.sizes.gutters[4]} marginBottom={theme.sizes.gutters[4]}>
              <Text tColor={theme.palette.dark.main} fSize={'small'} fWeight={'bold'} tAlign={'center'}>checking
                status...</Text>
            </Box>
          </Box>
          : <><Box marginBottom={theme.sizes.gutters[4]} display={'flex'} justifyContent={'center'}>
            <MdCelebration size={72} color={theme.palette.dark.main}/>
          </Box>
            <Text tAlign={'center'} fSize={'large'} fWeight={'bold'}>It seems like you are not excluded</Text>
            <Box display={'flex'} justifyContent={'center'} marginTop={theme.sizes.gutters[4]}>
              <Button onClick={handleClose} color={'success'} size={'sm'} rounded>ok, close</Button>
            </Box></>}
      </ModalContent>
    </Modal>
  )
}

const Home = () => {
  const {ads} = useDataContext()
  const theme = useTheme()
  const exclusion = useGetSubPath(selfHelp, 'exclusion')
  const isEx = useMatch(exclusion)

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
      }, 3000)
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
            <Table striped isHover capHead
                   captionText={`10 of ${ads.length} ads`} captionSide={'bottom'}
                   tableSize={'lg'}>
              <THead>
                <TableRow>
                  <TableHead>Latest Ads</TableHead>
                </TableRow>
              </THead>
              <TBody>
                {ads.slice(0, 10).map((ad, idx) => {
                  return (
                    <TableRow key={idx} onClick={() => handleOpenAd(ad.id)}>
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
      {openAds &&
        <AllAds handleAdClick={handleOpenAd} handleClose={handleOpenAdsToggle} openAds={openAds} ads={ads}
                isSm={isSm}/>}
      <Drawer rounded minHeight={'60%'} width={300} onClose={handleCloseAd}
              open={openedAd.open}
              anchor={isSm ? 'bottom' : 'right'}
              elevation={4}
              overlayStyle={{zIndex: theme.sizes.zIndex.modal + 1}}>
        <Box padding={theme.sizes.gutters[4]} style={{background: 'transparent'}}>
          {openedAd.isLoading ?
            <Loader/> : openedAd.ad ? <Ad ad={openedAd.ad} theme={theme}/>
              : <Text fSize={'medium'} fWeight={'bold'}>Ad not found</Text>
          }
        </Box>
      </Drawer>
      {isEx && <Exclusion open={isEx}/>}
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
  handleAdClick: PropTypes.func.isRequired,
  isSm: PropTypes.bool,
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

Exclusion.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default Home;