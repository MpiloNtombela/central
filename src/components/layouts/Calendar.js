import {css} from "@emotion/react";
import styled from "@emotion/styled";
import React, {useEffect, useState} from 'react';
import XeDate from "../../utils/xeDate";

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
  width: calc(100% / 7);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  font-size: .85em;
  user-select: none;
  background: ${({theme, wkEnd}) => wkEnd ? theme.palette.dark.glass : 'inherit'};
`
const StyledHead = styled.div`
  ${CalStyles};
  font-weight: bold;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  ${StyledCol} {
    padding: .5rem .25rem;
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
  border: 1px solid grey;
  border-bottom: 0;
  border-right: 0;
  font-size: 16px;
`

const Calendar = () => {
  const initDate = new XeDate()
  const [prevDates, setPrevDates] = useState([])
  const [dates, setDates] = useState([])
  const [nextDates, setNextDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState({
    date: initDate.getDate(),
    month: initDate.month(),
    year: initDate.getFullYear()
  })


  const getStartDay = (yr, month, date) => {
    return XeDate.create(yr, month, date).getDay()
  }

  const getPrevDate = (yr, month) => {
    let x = XeDate.create(yr, month)
    x.sub('month', 1)
    return x
  }

  useEffect(() => {
    let _prev = [],
      _dates = [],
      _nextDates = []
    setLoading(true)
    const xdate = XeDate.create(currentDate.year, currentDate.month, currentDate.date)

    const startDay = getStartDay(currentDate.year, currentDate.month)
    const prev = getPrevDate(currentDate.year, currentDate.month)
    let prevMonthNumDays = prev.numOfDays()
    let numOfDays = xdate.numOfDays()
    if (startDay > 0) {
      for (let x = 0; x < startDay; x++) {
        _prev.unshift(prevMonthNumDays - x)
      }
      setPrevDates(_prev)
    }
    if (6 - xdate.getMonthEndDay() > 0) {
      for (let x = 1; x <= (6 - xdate.getMonthEndDay()); x++) {
        _nextDates.push(x)
      }
      setNextDates(_nextDates)
    }
    for (let x = 1; x <= numOfDays; x++) {
      _dates.push(x)
    }
    setDates(_dates)
    setLoading(false)
  }, [])
  return (
    <StyledCalContainer>
      <StyledHead>
        <StyledCol>SUN</StyledCol>
        <StyledCol>MON</StyledCol>
        <StyledCol>TUE</StyledCol>
        <StyledCol>WED</StyledCol>
        <StyledCol>THU</StyledCol>
        <StyledCol>FRI</StyledCol>
        <StyledCol>SAT</StyledCol>
      </StyledHead>
      <StyledCalDays>
        {!loading &&
          <>
            {prevDates.length > 0 && prevDates.map((date, idx) =>
              <StyledCol bgColor={'transparent'} color={'grey'} key={idx}>{date}</StyledCol>
            )}
            {dates.map((date, idx) => <StyledCol key={idx}>{date}</StyledCol>)}
            {nextDates.map((date, idx) =>
              <StyledCol bgColor={'transparent'} color={'grey'} key={idx}>{date}</StyledCol>
            )}
          </>}
      </StyledCalDays>
    </StyledCalContainer>
  );
};

export default Calendar;