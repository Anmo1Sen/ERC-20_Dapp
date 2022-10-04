import React, { useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import Image from "next/image";
import { ERC20ICOContext } from '../../context/FunToken';
//import loader from '../../assets/loader.gif';
//import funToken from '../../assets/funToken.png';

const NavBar = () => {
    const { account, accountBalance, userId } = useContext(ERC20ICOContext);
    return (
      <div className={Style.navBar}>
        <div className={Style.navBar_box}>
          <div className={Style.navBar_box_left}>
            <h1> FUNNY Token</h1>
          </div>
          <div className={Style.navBar_box_right}>
            <p>
              Token Balance &nbsp; &nbsp; <span>{accountBalance}</span>
            </p>
            <p>
              <span>UserId #{userId}</span> &nbsp; &nbsp;
              {account}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default NavBar;