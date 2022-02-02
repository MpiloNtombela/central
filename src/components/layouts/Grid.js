import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Grid = styled.div(
  ({ theme, gridSpacing = 1, justifyGrid = "flex-start", alignGrid = "flex-start" }) => {
    const g = theme.sizes.gutters[gridSpacing];
    return `
      display: flex;
      margin-left: calc(${g} - (${g} * 2));
      margin-right: calc(${g} - (${g} * 2));
      flex-direction: row;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: ${justifyGrid};
      align-items: ${alignGrid};

      ${GridCell} {
        padding: ${g}
      }
`;
  }
);

const getCols = ({ colsSm = 12, colsMd, colsLg, colsXl, colsXxl }) => {
  const sm = colsSm;
  const md = colsMd ? colsMd : sm;
  const lg = colsLg ? colsLg : md;
  const xl = colsXl ? colsXl : lg;
  const xxl = colsXxl ? colsXxl : xl;

  return { sm, md, lg, xl, xxl };
};
export const GridCell = styled.div((props) => {
  const cols = getCols(props);
  return `
  box-sizing: border-box;

  @media(min-width: ${props.theme.breakpoints.xl + 1}px) {
    flex: 0 0 auto;
    width: ${8.33 * cols.xxl}%
  }

  @media(max-width: ${props.theme.breakpoints.xl}px) {
    flex: 0 0 auto;
    width: ${8.33 * cols.xl}%
  }

  @media(max-width: ${props.theme.breakpoints.lg}px) {
    flex: 0 0 auto;
    width: ${8.33 * cols.lg}%
  }

  @media(max-width: ${props.theme.breakpoints.md}px) {
    flex: 0 0 auto;
    width: ${8.33 * cols.md}%
  }

  @media(max-width: ${props.theme.breakpoints.sm}px) {
    flex: 0 0 auto;
    width: ${8.33 * cols.sm}%
  }
`;
});

const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
GridCell.propTypes = {
  colsSm: PropTypes.oneOf(cols),
  colsMd: PropTypes.oneOf(cols),
  colsLg: PropTypes.oneOf(cols),
  colsXl: PropTypes.oneOf(cols),
  colsXxl: PropTypes.oneOf(cols),
}

Grid.propTypes = {
  gridSpacing: PropTypes.oneOf([1, 2, 3, 4]),
  justifyGrid: PropTypes.string,
  alignGrid: PropTypes.string
}

export default Grid;
