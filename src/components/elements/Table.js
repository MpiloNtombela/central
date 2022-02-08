import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from 'react';

export const TableHead = styled.th`
  box-sizing: border-box;
`

export const TableData = styled.td`
  box-sizing: border-box;
`

export const TableRow = styled.tr`
  box-sizing: border-box;
`
export const THead = styled.thead``
export const TBody = styled.tbody``
export const TFoot = styled.tfoot``

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;

  ${TableRow}, ${TableData}, ${TableHead} {
    border: ${({bordered, theme}) => bordered ? `.125rem solid ${theme.palette.muted.glass}` : 0};;
  }
  
  ${TBody} ${TableRow} {
    &:nth-of-type(odd) {
      background: ${({striped, color, theme}) => striped ? theme.palette[color]?.light : 'none'};
      color: ${({striped, color, theme}) => striped ? theme.palette[color]?.contrastText : 'inherit'};
    }
  }

  ${TableRow} {
    height: ${({theme, tableSize}) => tableSize === 'lg' ? '2.5rem' : theme.sizes.gutters[4]};
  }

  ${TableHead} {
    padding: 0 ${({theme}) => theme.sizes.gutters[2]};
    text-align: ${({contentAlign}) => contentAlign};
    text-transform: ${({capHead}) => capHead ? 'uppercase' : 'none'};
    background: ${({headColor, theme}) => headColor ? theme.palette[headColor]?.dark : 'none'};
  }

  ${TableData} {
    padding: 0 ${({theme}) => theme.sizes.gutters[2]};
    text-align: ${({contentAlign}) => contentAlign};
  }
`


const Table = ({
                 color = 'secondary',
                 contentAlign = 'start',
                 headColor,
                 tableSize = "sm",
                 striped = false,
                 capHead = false,
                 bordered = false,
                 children
               }) => {
  return (
    <StyledTable striped={striped} headColor={headColor} color={color} contentAlign={contentAlign} tableSize={tableSize}
                 bordered={bordered}
                 capHead={capHead}>
      {children}
    </StyledTable>
  );
};

Table.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger", "info"]),
  headColor: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger", "info"]),
  contentAlign: PropTypes.oneOf(['start', 'center', 'end']),
  tableSize: PropTypes.oneOf(['sm', 'lg']),
  children: PropTypes.node,
  capHead: PropTypes.bool,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
}

export default Table;