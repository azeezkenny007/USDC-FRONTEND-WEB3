import React, { useRef, useState } from "react";
import { providers, Contract, utils } from "ethers";
import { abi } from "../constants/UsdcMetadata.json";
import { USDCGoerliAddress, UDSCaddress } from "../constants/index";
import { abi as usdcAbi } from "../constants/mainUsdcMetadata.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3Modal from "web3modal";

type Props = {};

export default function Usdc({}: Props) {
  const [connectwallet, setWalletConnected] = useState<boolean>(false);
  const [approve, setApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [donationAmount,setDonationAmount]= useState<string>("")
  const web3ModalRef = useRef<any>();
  const getProviderAndSigner = async (): Promise<{
    provider: providers.Web3Provider;
    signer: providers.JsonRpcSigner;
  }> => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 5) {
      alert("Please change network to goerli ");
      throw new Error("Please change network to goerli");
    }
    const signer = web3Provider.getSigner();
    return { provider: web3Provider, signer };
  };

  const getUsdcContractInstance = async (
    address: string,
    abi: any,
    ProviderOrSigner: providers.Web3Provider | providers.JsonRpcSigner
  ) => {
    return new Contract(address, abi, ProviderOrSigner);
  };

  const Approve = async () => {
    try {
      if (connectwallet) {
        const { provider, signer } = await getProviderAndSigner();
        const UsdcContract = await getUsdcContractInstance(
          UDSCaddress,
          usdcAbi,
          signer
        );
        const approve = await UsdcContract.approve(
          USDCGoerliAddress,
          utils.parseUnits("1000", 6)
        );
        setApprove(true);
        await approve.wait();
        setApprove(false);
        setIsApproved(true);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const fund = async (amount: string) => {
    try {
      if (connectwallet) {
        const { provider, signer } = await getProviderAndSigner();
        const UsdcContract = await getUsdcContractInstance(
          USDCGoerliAddress,
          abi,
          signer
        );
        const fund = await UsdcContract.fund(amount, { gasLimit: 30000 });
        setLoading(true);
        await fund.wait();
        setLoading(false);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderAndSigner();
      setWalletConnected(true);
      if (!connectwallet) {
       web3ModalRef.current = new Web3Modal({
         network: "goerli",
         providerOptions: {},
         disableInjectedProvider: false,
       });
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const render=()=>{
     if (!connectwallet){
      return(
       <div className="flex flex-col items-center justify-center max-h-screen space-y-4">
       <div className="text-[50px] font-bold font-mono text-white">Connect your Wallet to be able to donate</div>
       <div style={{transition:"all 0.4s !important"}} className="flex justify-center items-center font-mono hover:shadow-md animate-pulse transition-all hover:shadow-white bg-blue-800 py-4 rounded-lg w-40 text-white cursor-pointer" onClick={connectWallet}>Connect wallet</div>
       </div>
      )
     }
     else{
      if(approve){
       return(
        <div className="p-2 bg-blue-800 text-white shadow-lg">Approving the smart contract.....</div>
       )
      }
      if(loading){
        return(
           <div className="text-blue-700">Loading please wait.......</div>
        )
      }
      if(isApproved){
          return(
           <div className="flex ">
           <input type="text" name="" id="" onChange={(e)=>{setDonationAmount(e.target.value)}} />
           <div>Donate in Usdc to buy a tree</div>
           <div className="flex items-center justify-center bg-blue-400 px-6 py-4" onClick={()=>{fund(donationAmount)}}>Donate</div>
           </div>
          )
      }
     }
    

  }

  return <div>
       <div>{render()}</div>
  </div>;
}
