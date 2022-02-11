import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';
import {contrastColor} from "../../utils/colors";

const StyledTableHead = styled.th`
  box-sizing: border-box;
  white-space: nowrap;
`

const StyledTableData = styled.td`
  box-sizing: border-box;
`

const StyledTableRow = styled.tr`
  box-sizing: border-box;
`
const StyledCaption = styled.caption``
const StyledTHead = styled.tbody``
const StyledTBody = styled.tbody``
const StyledTFoot = styled.tbody``

const StyledTableContainer = styled.div`
  max-width: 100%;
  display: flex;
  overflow-x: auto;
  height: fit-content;
  border-radius: ${({theme}) => theme.sizes.radius.lg};
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;

  ${StyledTableRow}, ${StyledTableData}, ${StyledTableHead} {
    border: ${({bordered, theme}) => bordered ? `.124rem solid ${theme.palette.dark.glass}` : 0};;
  }

  ${StyledTHead} ${StyledTableRow} {
    background: ${({headColor, theme}) => headColor ? theme.palette[headColor]?.dark : 'none'};
  }

  ${StyledTBody} ${StyledTableRow} {
    &:nth-of-type(odd) {
      background: ${({striped, color, theme}) => striped ? theme.palette[color]?.light : 'none'};
      color: ${({striped, color, theme}) => striped ? theme.palette[color]?.contrastText : 'inherit'};
    }

    &:hover {
      cursor: ${props => props.isHover ? 'pointer' : 'default'};
      background: ${({
                       isHover,
                       color,
                       theme
                     }) => isHover && color ? theme.palette[color]?.glass : theme.palette.dark.glass};
      color: ${({color, theme}) => color ? contrastColor(theme.palette[color]?.glass, true).color : 'inherit'};
    }
  }

  ${StyledTableRow} {
    height: ${({tableSize}) => tableSize === 'lg' ? '2.5rem' : '1.75rem'};
  }

  ${StyledTableHead} {
    padding: 0 ${({theme}) => theme.sizes.gutters[2]};
    text-align: ${({contentAlign}) => contentAlign};
    text-transform: ${({capHead}) => capHead ? 'uppercase' : 'capitalize'};
    color: ${({headColor, theme}) => headColor ? theme.palette[headColor]?.contrastText : 'inherit'};
  }

  ${StyledTableData} {
    padding: 0 ${({theme}) => theme.sizes.gutters[2]};
    text-align: ${({contentAlign}) => contentAlign};
  }

  ${StyledCaption} {
    caption-side: ${({captionSide}) => captionSide};
    font-size: small;
    color: ${({theme}) => theme.color.secondary};
    text-align: start;
    margin: ${({theme}) => theme.sizes.gutters[2]} 0;
  }
`

export const TableHead = ({children, ...rest}) => <StyledTableHead {...rest}>{children}</StyledTableHead>
export const TableRow = ({children, ...rest}) => <StyledTableRow {...rest}>{children}</StyledTableRow>
export const TableData = ({children, ...rest}) => <StyledTableData {...rest}>{children}</StyledTableData>
export const THead = ({children, ...rest}) => <StyledTHead {...rest}>{children}</StyledTHead>
export const TBody = ({children, ...rest}) => <StyledTBody {...rest}>{children}</StyledTBody>
export const TFoot = ({children, ...rest}) => <StyledTFoot {...rest}>{children}</StyledTFoot>

const Table = ({
                 headColor,
                 responsive,
                 captionText,
                 color = 'dark',
                 contentAlign = 'start',
                 tableSize = "sm",
                 striped = false,
                 capHead = false,
                 bordered = false,
                 captionSide = 'bottom',
                 isHover = false,
                 children,
               }) => {

  if (responsive) {
    return (
      <StyledTableContainer>
        <StyledTable striped={striped}
                     headColor={headColor}
                     color={color}
                     contentAlign={contentAlign}
                     tableSize={tableSize}
                     bordered={bordered}
                     captionSide={captionSide}
                     isHover={isHover}
                     capHead={capHead}>
          {children}
          <StyledCaption>{captionText}</StyledCaption>
        </StyledTable>
      </StyledTableContainer>)
  } else {
    return (
      <StyledTable striped={striped}
                   headColor={headColor}
                   color={color}
                   contentAlign={contentAlign}
                   tableSize={tableSize}
                   bordered={bordered}
                   captionSide={captionSide}
                   capHead={capHead}>
        {children}
        <StyledCaption>{captionText}</StyledCaption>
      </StyledTable>
    );
  }

};

TableHead.propTypes = {
  children: PropTypes.node,
}
TableRow.propTypes = {
  children: PropTypes.node,
}
TableData.propTypes = {
  children: PropTypes.node,
}
THead.propTypes = {
  children: PropTypes.node,
}
TBody.propTypes = {
  children: PropTypes.node,
}
TFoot.propTypes = {
  children: PropTypes.node,
}

Table.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger", "info", 'dark']),
  headColor: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger", "info", "dark"]),
  contentAlign: PropTypes.oneOf(['start', 'center', 'end']),
  tableSize: PropTypes.oneOf(['sm', 'lg']),
  children: PropTypes.node,
  capHead: PropTypes.bool,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  responsive: PropTypes.bool,
  captionText: PropTypes.string,
  captionSide: PropTypes.oneOf(['top', 'bottom']),
  isHover: PropTypes.bool,
}

export default Table;