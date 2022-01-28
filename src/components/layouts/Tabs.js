import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, {Children, useContext, useLayoutEffect} from 'react';
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

const StyledTab = styled.li`
  padding: ${({theme}) => `${theme.sizes.gutters[3]} ${theme.sizes.gutters[1]}`};
  border-bottom: ${({isActive, theme}) => isActive ? `2px solid ${theme.palette.primary.main}` : 'none'};
  color: ${({isActive, theme}) => isActive ? theme.palette.primary.main : theme.color.secondary};
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

  &::-webkit-scrollbar {
    display: none;
  }

  ${StyledTab} {
    min-width: ${({isFixed, tabCount}) => isFixed ? `calc(100% / ${tabCount})` : 'fit-content'};
    max-width: ${({isFixed, tabCount}) => isFixed ? `calc(100% / ${tabCount})` : 'calc(100% / 2)'};
  }
`

const StyledTabContent = styled.div`
  padding: ${({theme}) => theme.sizes.gutters[2]};
  overflow-y: auto;
  overflow-x: hidden;
  display: ${props => props.isActive ? 'block' : 'none'};
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

export const Tabs = ({children, isFixed, selectedTab, center}) => {
  const dispatch = useContext(TabDispatch)
  const childrenTabs = Children.toArray(children).filter(child => child.type === Tab)

  useLayoutEffect(() => {
    if (selectedTab !== false) {
      if (selectedTab && selectedTab !== true) {
        dispatch({type: CHANGE_TAB, payload: selectedTab})
      } else {
        dispatch({type: CHANGE_TAB, payload: childrenTabs[0]?.props.value})
      }
    }
  }, [])
  return (
    <StyledTabs isFixed={isFixed} tabCount={childrenTabs?.length} center={center}>
      {Children.map(children, (child, idx) => {
        if (child.type === Tab) {
          return React.cloneElement(child, {value: child.props.value ? child.props.value : idx})
        } else {
          return child
        }
      })}
    </StyledTabs>
  )
}

export const Tab = ({value, children}) => {
  const dispatch = useContext(TabDispatch);
  const tabData = useContext(TabDataContext)

  const handleTabChange = () => {
    if (tabData.activeTab === value) return;
    dispatch({type: CHANGE_TAB, payload: value})
  }

  return (
    <StyledTab onClick={handleTabChange} isActive={tabData.activeTab === value} tabCoun={tabData.tabCount}>
      {children}
    </StyledTab>
  )

}
export const TabContent = ({value, children}) => {
  const tabData = useContext(TabDataContext)

  return (
    <StyledTabContent isActive={tabData.activeTab === value}>
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
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default TabContext;