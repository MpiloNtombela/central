import PropTypes from "prop-types";
import React from 'react'
import {Navigate} from 'react-router-dom'
import {useDataContext} from '../hooks/context';
import Loader from './layouts/Loader';

const PrivateRoute = ({children}) => {
  const {isLoading, student: {studentNumber}} = useDataContext();
  if (isLoading) {
    return <Loader/>
  }
  return studentNumber ? children : <Navigate to="/login"/>
}

PrivateRoute.propTypes = {
  children: PropTypes.element
}

export default PrivateRoute
