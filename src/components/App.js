import React, {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import {useDataContext, useDataDispatch} from "../hooks/context";
import {useGetSubPath} from "../hooks/routes";
import {CLEAR_ALERT, LOADED, LOADING} from "./DataContext";
import Snackbar from "./layouts/Snackbar";
import ClassMarks from "./pages/achievement/ClassMarks";
import FinalMark from "./pages/achievement/FinalMarks";
import Bio from "./pages/admin/Bio";
import Registration from "./pages/admin/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainNavbar from "./pages/MainNavbar";
import IEnabler from "./pages/self/IEnabler";
import {achievements, admin, selfHelp} from "./pages/utils/mainRoutes";
import PrivateRoute, {AnonRoute} from "./PrivateRoute";
import Theme from "./Theme";

const App = () => {
  const [isDark, setMode] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const ienabler = useGetSubPath(selfHelp, 'ienabler')
  const reg = useGetSubPath(selfHelp, 'registration')
  const exclusion = useGetSubPath(selfHelp, 'exclusion')
  const cMarks = useGetSubPath(achievements, 'Class Marks')
  const fMarks = useGetSubPath(achievements, 'Final Marks')
  const regHist = useGetSubPath(admin, 'Reg History')
  const bio = useGetSubPath(admin, 'Biographical')
  const {alert} = useDataContext()
  const dispatch = useDataDispatch()
  const auth = useAuth()

  useEffect(() => {
    dispatch({type: LOADING})
    let stuNum = localStorage.getItem("stuNum");
    auth.setUser(stuNum)
    setTimeout(() => {
      dispatch({type: LOADED})
    }, 3500);
  }, [])

  const handleAlertClose = () => {
    dispatch({type: CLEAR_ALERT})
  }

  return (
    <Theme>
      <HashRouter>
        <MainNavbar/>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path="/login" element={<AnonRoute><Login/></AnonRoute>}/>
          <Route path={exclusion} element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path={ienabler} element={<PrivateRoute><IEnabler/></PrivateRoute>}/>
          <Route path={reg} element={<PrivateRoute><IEnabler/></PrivateRoute>}/>
          <Route path={cMarks} element={<PrivateRoute><ClassMarks/></PrivateRoute>}/>
          <Route path={fMarks} element={<PrivateRoute><FinalMark/></PrivateRoute>}/>
          <Route path={regHist} element={<PrivateRoute><Registration/></PrivateRoute>}/>
          <Route path={bio} element={<PrivateRoute><Bio/></PrivateRoute>}/>
        </Routes>
      </HashRouter>
      <Snackbar open={alert.message !== '' && alert.message !== null && alert.message !== undefined}
                text={alert.message}
                type={alert.status ? alert.status : 'default'} onClose={handleAlertClose}/>
    </Theme>
  );
}

export default App;