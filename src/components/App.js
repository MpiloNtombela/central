import React, {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {useGetSubPath} from "../hooks/routes";
import DataProvider from "./DataContext";
import ClassMarks from "./pages/achievement/ClassMarks";
import FinalMark from "./pages/achievement/FinalMarks";
import Bio from "./pages/admin/Bio";
import Registration from "./pages/admin/Registration";
import Home from "./pages/Home";
import MainNavbar from "./pages/MainNavbar";
import IEnabler from "./pages/self/IEnabler";
import {achievements, admin, selfHelp} from "./pages/utils/mainRoutes";
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

  useEffect(() => {
    setMode(localStorage.getItem('mode') === 'dark')
    setLoading(false)
  }, [])

  const handleMode = () => {
    setMode(!isDark)
    localStorage.setItem('mode', isDark ? 'light' : 'dark')
  }
  return (
    <DataProvider>
      <Theme isDark={!isLoading && isDark}>
        <HashRouter>
          <MainNavbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path={exclusion} element={<Home/>}/>
            <Route path={ienabler} element={<IEnabler/>}/>
            <Route path={reg} element={<IEnabler/>}/>
            <Route path={cMarks} element={<ClassMarks/>}/>
            <Route path={fMarks} element={<FinalMark/>}/>
            <Route path={regHist} element={<Registration/>}/>
            <Route path={bio} element={<Bio/>}/>
          </Routes>
        </HashRouter>
      </Theme>
    </DataProvider>
  );
}

export default App;