import {css} from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, {Children, useContext, useLayoutEffect, useRef} from 'react';
import {useImmerReducer} from "use-immer";

const TabDataContext = React.createContext()
const TabDispatch = React.createContext()


const tabInitData = {
  activeTab: null,
}

const CHANGE_TAB = 'CHANGE_TAB'

const tabReducer = (draft, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      draft.activeTab = action.payload
      break
  }
}

const angles = {
  up: '-135deg',
  down: '45deg',
  right: '-45deg',
  left: '135deg',
}

const StyledScrollIcon = styled.i`
  border: solid ${({theme, color}) => color ? color : theme.palette.dark.contrast.glass};
  border-width: 0 5px 5px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(${({arrowPoint}) => angles[arrowPoint]});
`
const StyledScrollArrow = ({theme, color}) => css`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color ? color : theme.palette.dark.glass};
  top: 0;
  bottom: 0;
  padding: ${theme.sizes.gutters[3]} ${theme.sizes.gutters[2]};
  list-style: none;
  border-radius: ${theme.sizes.radius.sm};

  &.hidden {
    display: none;
  }
`

const StyledLeftScrollArrow = styled.ul`
  ${StyledScrollArrow};
  left: 0;
`

const StyledRightScrollArrow = styled.ul`
  ${StyledScrollArrow};
  right: 0;
`

const StyledTab = styled.li`
  padding: ${({theme}) => `${theme.sizes.gutters[3]} ${theme.sizes.gutters[4]}`};
  border-bottom: 2px solid;
  border-bottom-color: ${({
                            isActive,
                            theme,
                            indicatorColor
                          }) => isActive ? `${indicatorColor ? indicatorColor : theme.palette.primary.main}` : 'transparent'};
  color: ${({
              isActive,
              theme,
              textColor
            }) => isActive ? textColor ? textColor : theme.palette.primary.main : theme.color.secondary};
  text-align: center;
  box-sizing: border-box;
  text-transform: uppercase;
  font-size: small;
  font-weight: 500;

  &:hover {
    background: hsla(0, 0%, 100%, .25);
    cursor: pointer;
  }
`

const StyledTabs = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: ${({center}) => center ? 'center' : 'normal'};
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  box-sizing: border-box;
  box-shadow: ${({elevation}) => elevation ? `0 4px 2px -2px rgba(0, 0, 0, .${elevation})` : 'none'};
  position: relative;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  ${StyledTab} {
    min-width: ${({isFixed, tabCount}) => isFixed ? `calc(100% / ${tabCount})` : 'fit-content'};
    max-width: ${({isFixed, tabCount}) => isFixed ? `calc(100% / ${tabCount})` : 'calc(100% / 2)'};
    padding: ${({theme}) => `${theme.sizes.gutters[3]} ${theme.sizes.gutters[4]}`};
  }
`

const StyledTabContent = styled.div`
  padding: ${({theme}) => `${theme.sizes.gutters[4]} ${theme.sizes.gutters[2]}`};;
  overflow-y: auto;
  overflow-x: hidden;
  display: ${props => props.isActive ? 'block' : 'none'};
  box-sizing: border-box;
  height: 100%;
`

const TabContext = ({children}) => {
  const [tabData, dispatch] = useImmerReducer(tabReducer, tabInitData)

  return (
    <TabDataContext.Provider value={tabData}>
      <TabDispatch.Provider value={dispatch}>
        {children}
      </TabDispatch.Provider>
    </TabDataContext.Provider>
  );
};

export const Tabs = ({
                       isFixed,
                       selectedTab,
                       center,
                       style,
                       textColor,
                       indicatorColor,
                       scrollArrowsBg,
                       scrollArrowsColor,
                       showScrollArrows = true,
                       elevation = 0,
                       children,
                     }) => {
  const dispatch = useContext(TabDispatch)
  const childrenTabs = Children.toArray(children).filter(child => child.type === Tab)
  const tabsEl = useRef(null);

  const scrollTab = (tabEl) => {
    if (!tabEl) return
    const sLeft = tabEl.querySelector('[data-scroll-left]')
    const sRight = tabEl.querySelector('[data-scroll-right]')

    if (tabEl.scrollLeft < 5) {
      sLeft.classList.add('hidden')
    } else {
      sLeft.classList.remove('hidden')
    }
    if (tabEl.scrollLeft >= (tabEl.scrollWidth - tabEl.clientWidth)) {
      sRight.classList.add('hidden')
    } else {
      sRight.classList.remove('hidden')
    }
  }

  useLayoutEffect(() => {
    if (selectedTab !== false) {
      if (selectedTab && selectedTab !== true) {
        dispatch({type: CHANGE_TAB, payload: selectedTab})
      } else {
        dispatch({type: CHANGE_TAB, payload: childrenTabs[0]?.props.value})
      }
    }
    if (tabsEl.current && showScrollArrows && !isFixed) {
      scrollTab(tabsEl.current)
    }
  }, [])

  const handleScroll = (e) => {
    if (!showScrollArrows) return;
    scrollTab(e.currentTarget)
  }

  const handleLeftClick = (e) => {
    const tabCont = e.currentTarget.parentElement
    tabCont.scrollLeft = tabCont.scrollLeft > 75 ? tabCont.scrollLeft - 75 : 0
  }
  const handleRightClick = (e) => {
    const tabCont = e.currentTarget.parentElement
    tabCont.scrollLeft = tabCont.scrollWidth - tabCont.clientWidth <= 0 ? tabCont.clientWidth : tabCont.scrollLeft + 75
  }
  return (
    <StyledTabs ref={tabsEl} onScroll={handleScroll} style={style} isFixed={isFixed}
                tabCount={childrenTabs?.length} center={center} elevation={elevation}>
      {showScrollArrows && !isFixed &&
        <StyledLeftScrollArrow onClick={handleLeftClick} color={scrollArrowsBg} data-scroll-left>
          <StyledScrollIcon color={scrollArrowsColor} arrowPoint='left'/>
        </StyledLeftScrollArrow>}
      {Children.map(children, (child, idx) => {
        if (child.type === Tab) {
          return React.cloneElement(child,
            {
              value: child.props.value ? child.props.value : idx,
              textColor: textColor,
              indicatorColor: indicatorColor
            })
        } else {
          return child
        }
      })}
      {showScrollArrows && !isFixed &&
        <StyledRightScrollArrow color={scrollArrowsBg} onClick={handleRightClick} data-scroll-right>
          <StyledScrollIcon color={scrollArrowsColor} arrowPoint='right'/>
        </StyledRightScrollArrow>}
    </StyledTabs>
  )
}

export const Tab = ({value, style, children, ...rest}) => {
  const dispatch = useContext(TabDispatch);
  const tabData = useContext(TabDataContext)
  const tabRef = useRef(null)

  const handleTabChange = () => {
    if (tabData.activeTab === value) return;
    dispatch({type: CHANGE_TAB, payload: value})
  }

  return (
    <StyledTab ref={tabRef} style={style} onClick={handleTabChange} isActive={tabData.activeTab === value} {...rest}>
      {children}
    </StyledTab>
  )

}
export const TabContent = ({value, style, children}) => {
  const tabData = useContext(TabDataContext)

  return (
    <StyledTabContent style={style} isActive={tabData.activeTab === value}>
      {children}
    </StyledTabContent>
  )
}

TabContext.propTypes = {
  children: PropTypes.node,
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  isFixed: PropTypes.bool,
  selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  center: PropTypes.bool,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  style: PropTypes.object,
  indicatorColor: PropTypes.string,
  textColor: PropTypes.string,
  scrollArrowsBg: PropTypes.string,
  scrollArrowsColor: PropTypes.string,
  showScrollArrows: PropTypes.bool,
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  style: PropTypes.object,
}

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
}

export default TabContext;