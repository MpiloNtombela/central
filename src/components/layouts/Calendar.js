import {css} from "@emotion/react";
import styled from "@emotion/styled";
import React, {useEffect, useState} from 'react';

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
  const currentDate = new Date()
  const [date, setDate] = useState({
    date: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
  })
  const [dates, setDates] = useState([])
  const [loading, setLoading] = useState(true)
  const getDaysInMonth = (yr, month) => {
    return new Date(yr, month, 0).getDate()
  }
  const getStartDay = (yr, month) => {
    return new Date(yr, month - 1, 1).getDay()
  }

  const subMonth = ({yr, month, date = 1, numMonths = 1}) => {
    month -= 1
    let x = new Date(yr, month, date)
    x.setMonth(month - numMonths)
    return x
  }

  const getPrevDate = (yr, month) => {
    let x = subMonth({yr, month, numMonths: 1})
    return {year: x.getFullYear(), month: x.getMonth() + 1, date: x.getDate(), day: x.getDay()}
  }

  useEffect(() => {
    let _dates = []
    setLoading(true)
    const startDay = getStartDay(date.year, date.month)
    let prev = getPrevDate(date.year, date.month)
    console.log(prev)
    let prevMonth = getDaysInMonth(prev.year, prev.month)
    let currentMonth = getDaysInMonth(date.year, date.month)

    for (let x = 0; x < startDay; x++) {
      _dates.unshift(prevMonth - x)
    }
    for (let x = 1; x <= currentMonth; x++) {
      _dates.push(x)
    }
    setDates(_dates)
    setLoading(false)
  }, [])
  return (
    <StyledCalContainer>
      <StyledHead>
        <StyledCol wkEnd>SUN</StyledCol>
        <StyledCol>MON</StyledCol>
        <StyledCol>TUE</StyledCol>
        <StyledCol>WED</StyledCol>
        <StyledCol>THU</StyledCol>
        <StyledCol>FRI</StyledCol>
        <StyledCol wkEnd>SAT</StyledCol>
      </StyledHead>
      <StyledCalDays>
        {!loading &&
          <>
            {dates.map((date, idx) => {
              return <StyledCol key={idx}>{date}</StyledCol>
            })}
          </>}
      </StyledCalDays>
    </StyledCalContainer>
  );
};

export default Calendar;