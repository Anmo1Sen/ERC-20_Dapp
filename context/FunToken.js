import React,{useState,useEffect,useContext} from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { funTokenAddress, funTokenABI } from "./constants.js";


const fetchContractERC20 = (signer)=>
new ethers.Contract(funTokenAddress,funTokenABI,signer);

  export const ERC20ICOContext = React.createContext();

  export  const ERC20Provider = ({ children }) => {
  
   //----userAccount
   const [holderArray, setHolderArray] = useState([]);
   const [account, setAccount] = useState('');
   const [accountBalance, setAccountBalance] = useState('');
   const[userId,setUserId] = useState('');

   //---Token Info
   const [NoOfToken, setNoOfToken] = useState("");
   const [TokenName, setTokenName] = useState("");
   const [TokenStandard, setTokenStandard] = useState("");
   const [TokenSymbol,setTokensymbol] = useState("");
   const [TokenOwner, setTokenOwner] = useState("");
   const [TokenOwnerBal, setTokenOwnerBal] = useState("");

   //---CONNECTING WALLET TO APPLICATION

   const checkConnection = async()=>{
    try{
      if(!window.ethereum) return console.log("Install Metamask");
     
         const accounts = await window.ethereum.request({
          method : "eth_accounts",
         });
         setAccount(accounts[0]);

//----CREATING CONNECTION TO CONTRACT AND FETCH DATA

const web3modal = new Web3Modal();
const connection = await web3modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = provider.getSigner();
const contract = fetchContractERC20(signer);

//---GET ALL TOKEN HOLDER

const allTokenHolder = await contract.balanceOf(accounts[0]);
setAccountBalance(allTokenHolder.toNumber());

const totalHolder = await contract._userId();
setUserId(totalHolder.toNumber());

    }
    catch(error){
      console.log("App is not connected", error);
    }
   };

   //ERC_20 Contract
   const ERC20FunToken = async()=>{
    try {
    //----CREATING CONNECTION TO CONTRACT AND FETCH DATA
   
const web3modal = new Web3Modal();
const connection = await web3modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = provider.getSigner("0x849ADaA07a15EbE41dA760ed02a0E3d7127604E7");
const contract = fetchContractERC20(signer);

//Token Suppply
const supply = await contract.totalSupply();
const totalSupply = supply.toNumber();
setNoOfToken(totalSupply);

//TOKEN NAME,SYMBOL,STANDARD
const name = await contract.name();
setTokenName(name);

const symbol = await contract.symbol();
setTokensymbol(symbol);


const standard = await contract.standard();
setTokenStandard(standard);

//TOKEN OWNERCONTRACT

const ownerOfContract = await contract.ownerOfContract();
setTokenOwner(ownerOfContract);

const balanceToken = await contract.balanceOf(
  "0x849ADaA07a15EbE41dA760ed02a0E3d7127604E7"
);

setTokenOwnerBal(balanceToken.toNumber());

 
    
   } catch (error) {
    console.log("error in ERC20 Token");
   }
  };


  const transferToken = async (address,value) =>{
    try {

      if (!address || !value) return console.log("No Data");
      console.log(address, value * 1);
      const web3modal = new Web3Modal();
const connection = await web3modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = provider.getSigner();
const contract = fetchContractERC20(signer);

const transfer = await contract.transfer(address, BigInt(value * 1));

transfer.wait();
window.location.reload();
      
    } catch (error) {
      console.log("wrong  within transferfn");
    }
  };

  const tokenHolderData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const allTokenHolder = await contract.getTokenHolder(); //we get the addresses and we store it in el

      allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);   //after getting individual address we map there txn history by getTokenholderData().
        holderArray.push(singleHolderData);
        console.log(holderArray);
      });
    } catch (error) {
      console.log("Worng getting data");
    }
  };

    return( 
      
        <ERC20ICOContext.Provider 
        value={{checkConnection,
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
         }}>
         {children}
    </ERC20ICOContext.Provider>
  );
};
