import React, {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Test from "./Test";
import Theme from "./Theme";

const App = () => {
  const [isDark, setMode] = useState(true)
  useEffect(() => {
    setMode(localStorage.getItem('mode') === 'dark')
  }, [])

  const handleMode = () => {
    setMode(!isDark)
    localStorage.setItem('mode', isDark ? 'light' : 'dark')
  }
  return (
    <Theme>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Test/>}/>
        </Routes>
      </HashRouter>
    </Theme>
  );
}

export default App;