import React, {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Button from "./elements/Button";
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
    <Theme isDark={isDark}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Button onClick={handleMode}>change mode</Button>}/>
        </Routes>
      </HashRouter>
    </Theme>
  );
}

export default App;
