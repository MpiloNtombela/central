import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Grid, {GridCell} from "./Grid";


const StyledCollapsible = styled.div`
  background: ${({theme, bgColor}) => bgColor ? bgColor : theme.background.secondary};
  padding: ${({theme}) => theme.sizes.gutters[1]};
  color: ${({theme, tColor}) => tColor ? tColor : theme.color.main};;
`

const StyledCollapsibleHeader = styled.div`
  padding: ${({theme}) => `0 ${theme.sizes.gutters[2]}`};
  box-sizing: border-box;
  border-bottom: ${({
                      isHighlighted,
                      theme,
                      isOpen
                    }) => isHighlighted && isOpen ? `1px solid ${theme.palette.secondary.light}` : 0};
  cursor: pointer;
`

const StyledCollapsableIcon = styled.i`
  border: solid ${({theme}) => theme.color.secondary};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;

  &.arrow-up {
    transform: rotate(-135deg);
  }

  &.arrow-down {
    transform: rotate(45deg);
  }
`

const StyledCollapsibleContent = styled.div`
  max-height: 0;
  background: inherit;
  overflow: hidden;
  position: relative;
  opacity: 0;
  transition: all .5s ease-in-out;
  
  &.is-open {
    max-height: 100vh;
    opacity: 1;
    overflow: auto;
  }
`

const Collapsible = ({children, collapsed, header, bgColor, tColor, isHighlighted}) => {
  const [open, setOpen] = useState(collapsed)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <StyledCollapsible bgColor={bgColor} tColor={tColor}>
      <StyledCollapsibleHeader isOpen={open} isHighlighted={isHighlighted} onClick={handleToggle}>
        <Grid alignGrid={'center'}>
          <GridCell colsSm={11}>
            {header}
          </GridCell>
          <GridCell colsSm={1} style={{textAlign: 'center'}}>
            <StyledCollapsableIcon className={open ? 'arrow-up' : 'arrow-down'}/>
          </GridCell>
        </Grid>
      </StyledCollapsibleHeader>
      <StyledCollapsibleContent className={open ? 'is-open' : ''}>
        {children}
      </StyledCollapsibleContent>
    </StyledCollapsible>
  )
}

Collapsible.defaultProps = {
  isOpen: false,
  header: '',
  isHighlighted: true,
};

Collapsible.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  bgColor: PropTypes.string,
  tColor: PropTypes.string,
  isHighlighted: PropTypes.bool,
};

export default Collapsible;