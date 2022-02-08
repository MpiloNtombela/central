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
export const THead = ({children}) => <thead>{children}</thead>
export const TBody = ({children}) => <tbody>{children}</tbody>
export const TFoot = ({children}) => <tfoot>{children}</tfoot>

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;

  ${TableRow}, ${TableData}, ${TableHead} {
    border: .1rem solid red;
  }

  ${TableRow} {
    height: ${({theme, tableSize}) => tableSize === 'lg' ? '2.5rem' : theme.sizes.gutters[4]};
  }

  ${TableHead} {
    padding: 0 ${({theme}) => theme.sizes.gutters[2]};
    text-align: ${({contentAlign}) => contentAlign};
    text-transform: ${({capHead}) => capHead ? 'uppercase' : 'none'};
  }

  ${TableData} {
    padding: 0 ${({theme}) => theme.sizes.gutters[2]};
    text-align: ${({contentAlign}) => contentAlign};
  }
`


const Table = ({color, contentAlign = 'start', tableSize = "sm", capHead = false, children}) => {
  return (
    <StyledTable contentAlign={contentAlign} tableSize={tableSize} capHead={capHead}>
      {children}
    </StyledTable>
  );
};

Table.propTypes = {
  contentAlign: PropTypes.oneOf(['start', 'center', 'end']),
  tableSize: PropTypes.oneOf(['sm', 'lg']),
  children: PropTypes.node,
  capHead: PropTypes.bool,
}

export default Table;