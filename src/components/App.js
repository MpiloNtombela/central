import React, {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import DataProvider from "./DataContext";
import Button from "./elements/Button";
import Home from "./pages/Home";
import MainNavbar from "./pages/MainNavbar";
import IEnabler from "./pages/self/IEnabler";
import Theme from "./Theme";

const App = () => {
  const [isDark, setMode] = useState(true)
  const [isLoading, setLoading] = useState(true)
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
            <Route path="/self-help/ienabler" element={<IEnabler/>}/>
          </Routes>
        </HashRouter>
      </Theme>
    </DataProvider>
  );
}

export default App;