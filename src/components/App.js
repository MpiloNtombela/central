import {HashRouter, Link, Route, Routes} from "react-router-dom";
import Loader from "./layouts/Loader";
import {SkeletonContent} from "./layouts/Skeletons";
import Theme from "./Theme";
import React from "react";

const App = () => {
  return (
    <Theme>
      <HashRouter>
        <Link to={"/"}>prev</Link>
        <Link to={"/m"}>next</Link>
        <Routes>
          <Route path="/" element={<SkeletonContent/>}/>
          <Route path="/m" element={<Loader/>}/>
        </Routes>
      </HashRouter>
    </Theme>
  );
}

export default App;
