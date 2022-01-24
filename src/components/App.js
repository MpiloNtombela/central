import {HashRouter, Route, Routes} from "react-router-dom";
import Button from "./elements/Button";
import Loader from "./layouts/Loader";
import IEnabler from "./pages/self/IEneabler";
import Theme from "./Theme";
import React, {useEffect, useState} from "react";

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
    <Theme isDark={isDark}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Button onClick={handleMode}>change mode</Button>}/>
          <Route path="/e" element={<IEnabler/>}/>
        </Routes>
      </HashRouter>
    </Theme>
  );
}

export default App;
