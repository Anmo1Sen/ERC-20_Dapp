import React from "react";
import "../styles/globals.css";
import NavBar from '../components/NavBar/NavBar';

import {ERC20Provider} from "../context/FunToken";

const MyApp =({Component,pageProps})=>(
  <ERC20Provider>
    <NavBar/>
    <Component{...pageProps} />
  </ERC20Provider>
);

export default MyApp

