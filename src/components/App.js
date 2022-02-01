import React, {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Button from "./elements/Button";
import IconText from "./elements/IconText";
import Navbar, {NavbarLinks, NavbarLink} from "./elements/Navbar";
import Text from "./elements/Text";
import Box from "./layouts/Box";
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
          <Route path="/" element={<Button color={"danger"} onClick={handleMode}>change mode</Button>}/>
        </Routes>
      </HashRouter>
    </Theme>
  );
}

export default App;