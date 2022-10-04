import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/index.module.css";
import { ERC20ICOContext } from "../context/FunToken";
import funnyToken from '../assets/funtoken.png';
import Image from "next/image";
import User from '../components/User/User';
import Trasfer from '../components/Transfer/Transfer';

const Home = () => {

  const [myAccount, setMyAccount] = useState("");
  const [ammount, setAmmount] = useState(0);
  
  const {
    checkConnection,
    ERC20FunToken,
    transferToken,
    tokenHolderData,

    NoOfToken,
    TokenName,
    TokenStandard,
    TokenSymbol,
    TokenOwner,
    holderArray,
    account,
    accountBalance,
    TokenOwnerBal,
    userId,
  } = useContext(ERC20ICOContext);

  useEffect(() => {
    checkConnection();
    tokenHolderData();
    ERC20FunToken();
  }, []);
  return (
  <div className={Style.home}>
    <div className={Style.heroSection}>
      <div className={Style.heroSection_left}>
        <h1>Launching Fun Token (FUN) ERC20 Token</h1>
        <p>
          Lorem ipsem dolar sit amit Lorem ipsem dolar sit amit Lorem ipsem
          dolar sit amit Lorem ipsem dolar sit amit
        </p>
        <div className={Style.heroSection_left_btn}>
          <button className={Style.btn}>White paper</button>
          <button className={Style.btn}>product intro</button>
        </div>
      </div>
      <div className ={Style.heroSection_right}>
        <Image src={funnyToken} alt ="funnyToken" width ={300} height ={300}
        className= {Style.heroSection_right_img_one}/>
        <Image src={funnyToken} alt ="funnyToken" width ={200} height ={300}
        className= {Style.heroSection_right_img}/>
        <Image src={funnyToken} alt ="funnyToken" width ={100} height ={300} className= {Style.heroSection_right_img}/>
        <Image src={funnyToken} alt ="funnyToken" width ={50} height ={300} className= {Style.heroSection_right_img}/>
        <Image src={funnyToken} alt ="funnyToken" width ={20} height ={300} className= {Style.heroSection_right_img}/>
      </div>
    </div>
    <Trasfer 
    NoOfToken={NoOfToken}
     TokenName={TokenName} 
     TokenSymbol={TokenSymbol}
     TokenStandard={TokenStandard}
     TokenOwnerBal ={TokenOwnerBal}
     transferToken ={transferToken}
     />
    <User
    holderArray={holderArray}/>
  </div>
  );
};

export default Home;
