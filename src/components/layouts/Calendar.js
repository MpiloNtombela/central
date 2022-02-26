import {css, useTheme} from "@emotion/react";
import styled from "@emotion/styled";
import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";
import XeDate from "../../utils/xeDate";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Box from "./Box";
import Grid, {GridCell} from "./Grid";

const CalStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  background: inherit;
`

const StyledCol = styled.div`
  background: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
  color: ${({color}) => color ? color : 'inherit'};
  width: calc(100% / 7);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .85em;
  user-select: none;
`
const StyledHead = styled.div`
  ${CalStyles};
  font-weight: 900;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  ${StyledCol} {
    padding: .5rem .25rem;
    font-size: .95em;
  }
`

const StyledCalDays = styled.div`
  ${CalStyles};

  ${StyledCol} {
    aspect-ratio: 1/1;
    font-size: 1em;

    &:hover {
      cursor: pointer;
      background: ${({theme}) => theme.palette.secondary.glass};
    }
  }
`

const StyledCalContainer = styled.div`
  margin: .5rem;
  box-sizing: border-box;
  position: relative;
  background: ${({theme}) => theme.background.main};
  font-size: 16px;

  ${StyledCalDays} ${StyledCol} {
    border: ${({bordered}) => bordered ? '1px solid grey' : 0};
    border-bottom: ${({rounded}) => !rounded ? '1px solid grey' : 0};
    border-right: ${({rounded}) => !rounded ? '1px solid grey' : 0};
    border-radius: ${({rounded}) => rounded ? '50%' : '0'};
  }
`

const Calendar = ({year, month, day, rounded, bordered, onDateClick}) => {
  const theme = useTheme()
  const isSm = useMediaQuery({maxWidth: theme.breakpoints.sm})
  let initDate = new XeDate()
  if (year && month) {
    initDate = XeDate.create(year, month)
  }
  const [prevDates, setPrevDates] = useState([])
  const [dates, setDates] = useState([])
  const [nextDates, setNextDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(initDate)

  useEffect(() => {
    let _prev = [], _dates = [], _nextDates = []
    setLoading(true)
    setNextDates([])
    setPrevDates([])

    let startDay = currentDate.getMonthStartDay()
    let prev = currentDate.clone().sub('month', 1)
    let prevMonthNumDays = prev.numOfDays()
    if (startDay > 0) {
      for (let x = 0; x < startDay; x++) {
        _prev.unshift(prevMonthNumDays - x)
      }
      setPrevDates(_prev)
    }

    if ((6 - currentDate.getMonthEndDay()) > 0) {
      for (let x = 1; x <= (6 - currentDate.getMonthEndDay()); x++) {
        _nextDates.push(x)
      }
      setNextDates(_nextDates)
    }

    let numOfDays = currentDate.numOfDays()
    for (let x = 1; x <= numOfDays; x++) {
      let date = XeDate.create(currentDate.getFullYear(), currentDate.month(), x)
      _dates.push(date)
    }
    setDates(_dates)
    setLoading(false)
  }, [currentDate])

  const handlePrev = () => {
    setCurrentDate(currentDate.clone().sub('month', 1))
  }
  const handleNext = () => {
    setCurrentDate(currentDate.clone().add('month', 1))
  }

  const handleDateClick = ({event, date}) => {
    if (!onDateClick) return;
    return onDateClick({event, date})
  }

  return (<StyledCalContainer rounded={rounded} bordered={bordered}>
    <Box
      position={'sticky'} top={'0'}
      style={{background: 'inherit'}}>
      <Grid justifyGrid={'center'} alignGrid={'center'}>
        <GridCell colsSm={3}>
          <Button onClick={handlePrev} block size={'sm'}>prev</Button>
        </GridCell>
        <GridCell colsSm={6}>
          <Text tAlign={'center'} fSize={'medium'} fWeight={'bold'}>
            {currentDate.month(true, true)} {currentDate.getFullYear()}
          </Text>
        </GridCell>
        <GridCell colsSm={3}>
          <Button onClick={handleNext} block size={'sm'}>next</Button>
        </GridCell>
      </Grid>
      <StyledHead>
        <StyledCol>{isSm ? 'S' : 'SUN'}</StyledCol>
        <StyledCol>{isSm ? 'M' : 'MON'}</StyledCol>
        <StyledCol>{isSm ? 'T' : 'TUE'}</StyledCol>
        <StyledCol>{isSm ? 'W' : 'WED'}</StyledCol>
        <StyledCol>{isSm ? 'T' : 'THU'}</StyledCol>
        <StyledCol>{isSm ? 'F' : 'FRI'}</StyledCol>
        <StyledCol>{isSm ? 'S' : 'SAT'}</StyledCol>
      </StyledHead>
    </Box>
    <StyledCalDays>
      {!loading && <>
        {prevDates.length > 0 && prevDates.map((date, idx) => (<StyledCol
          key={idx}
          style={{fontStyle: 'italic'}}
          bgColor={bordered ? theme.palette.dark.light : 'transparent'}
          color={bordered ? theme.palette.dark.dark : theme.color.secondary}>
          {date}
        </StyledCol>))}
        {dates.map((date, idx) => {
          const eq = new XeDate().equal(date)
          return <StyledCol
            key={idx}
            color={eq ? theme.palette.secondary.contrast.dark : theme.color.main}
            bgColor={eq ? theme.palette.secondary.main : 'transparent'}
            style={{fontWeight: 500}}
            onClick={(event) => handleDateClick({event, date})}>
            {date.getDate()}
          </StyledCol>
        })}
        {nextDates.length > 0 && nextDates.map((date, idx) => (<StyledCol
          key={idx}
          bgColor={bordered ? theme.palette.dark.light : 'transparent'}
          color={bordered ? theme.palette.dark.dark : theme.color.secondary}
          style={{fontStyle: 'italic'}}>
          {date}
        </StyledCol>))}
      </>}
    </StyledCalDays>
  </StyledCalContainer>);
};

export default Calendar;