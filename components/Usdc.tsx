import React,{useRef} from 'react'
import { providers,Contract } from 'ethers';


type Props = {}

export default function Usdc({}: Props) {
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


 const getDaoContractInstance = async (
  ProviderOrSigner: providers.Web3Provider | providers.JsonRpcSigner
) => {
  return new Contract(CryptoDevsDAOGoerliAddress, abi, ProviderOrSigner);
};
  return (
    <div>Usdc</div>
  )
}