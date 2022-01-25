import {HashRouter, Route, Routes} from "react-router-dom";
import DataProvider from "./DataContext";
import Button from "./elements/Button";
import Loader from "./layouts/Loader";
import IEnablerLoader from "./pages/self/IEnablerLoader";
import IEnabler from "./pages/self/IEneabler";
import Theme from "./Theme";
import React, {useEffect, useState} from "react";

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
          <Routes>
            <Route path="/" element={<Button onClick={handleMode}>change mode</Button>}/>
            <Route path="/e" element={<IEnablerLoader/>}/>
          </Routes>
        </HashRouter>
      </Theme>
    </DataProvider>
  );
}

export default App;
