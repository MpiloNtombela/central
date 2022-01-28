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
  border-bottom: ${({
                      isActive,
                      theme,
                      indicatorColor
                    }) => isActive ? `2px solid ${indicatorColor ? indicatorColor : theme.palette.primary.main}` : 'none'};
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
  box-shadow: ${({elevation}) => elevation ? `0px -5px 20px 0px rgba(0, 0, 0, .${elevation})` : 'none'};

  &::-webkit-scrollbar {
    display: none;
  }

  ${StyledTab} {
    min-width: ${({isFixed, tabCount}) => isFixed ? `calc(100% / ${tabCount})` : 'fit-content'};
    max-width: ${({isFixed, tabCount}) => isFixed ? `calc(100% / ${tabCount})` : 'calc(100% / 2)'};
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

export const Tabs = ({children, isFixed, selectedTab, center, style, textColor, indicatorColor, elevation = 0}) => {
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
    <StyledTabs style={style} isFixed={isFixed}
                tabCount={childrenTabs?.length} center={center} elevation={elevation}>
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
    </StyledTabs>
  )
}

export const Tab = ({value, style, children, ...rest}) => {
  const dispatch = useContext(TabDispatch);
  const tabData = useContext(TabDataContext)

  const handleTabChange = () => {
    if (tabData.activeTab === value) return;
    dispatch({type: CHANGE_TAB, payload: value})
  }

  return (
    <StyledTab style={style} onClick={handleTabChange} isActive={tabData.activeTab === value} {...rest}>
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