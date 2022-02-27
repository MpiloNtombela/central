import PropTypes from "prop-types";
import React from 'react'
import {Navigate} from 'react-router-dom'
import {useDataContext} from '../hooks/context';
import LandingLoader from "./pages/LandingLoader";

const PrivateRoute = ({children}) => {
  const {isLoading, student: {studentNumber}} = useDataContext();
  if (isLoading) {
    return <LandingLoader/>
  } else {
    return studentNumber ? children : <Navigate to="/login"/>
  }
}

export const AnonRoute = ({children}) => {
  const {isLoading, student: {studentNumber}} = useDataContext();
  if (isLoading) {
    return <LandingLoader/>
  } else {
    return !studentNumber ? children : <Navigate to="/"/>
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.element
}

AnonRoute.propTypes = {
  children: PropTypes.element
}

export default PrivateRoute
