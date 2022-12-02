import React, {useEffect} from 'react';
import axios from "axios";
import Index from "./router";
import './APIs/auth';
import Header from "./components /header";

const App = () => {
  return (
    <>
      <Header/>
      <Index/>
    </>
  );
};

export default App;