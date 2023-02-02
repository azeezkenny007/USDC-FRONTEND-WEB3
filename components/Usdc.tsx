import React, { useRef, useState, useEffect } from "react";
import { providers, Contract, utils, Signer } from "ethers";
import { abi } from "../constants/UsdcMetadata.json";
import { USDCGoerliAddress, UDSCaddress } from "../constants/index";
import { abi as usdcAbi } from "../constants/mainUsdcMetadata.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@chakra-ui/react";
import Web3Modal from "web3modal";
import { motion } from "framer-motion";
import Image from "next/image";
import Draw1 from "../public/draw1.svg";
import Draw2 from "../public/draw2.svg";
import Draw3 from "../public/draw3.svg";
import Draw4 from "../public/draw4.svg";
import Draw5 from "../public/draw5.svg";
import Draw6 from "../public/draw6.svg";
import Draw7 from "../public/draw7.svg";
import Draw8 from "../public/draw8.svg";
import Draw9 from "../public/draw9.svg";
import Draw10 from "../public/draw10.svg";
import Draw11 from "../public/draw11.svg";
import Draw12 from "../public/draw12.svg";

type Props = {};

export default function Usdc({}: Props) {
  const nextVariant = {
    initial: {
      x: "-100vw",
    },
    animate: {
      x: 0,
      transition: { type: "spring", delay: 1.5, stiffness: 120, duration: 1.5 },
    },
    hover: {
      scale: 1.1,
    },
  };

  const upVariant = {
    initial: {
      x: "100vw",
    },
    animate: {
      x: 0,
      transition: { type: "spring", delay: 1.5, stiffness: 120, duration: 1.5 },
    },
  };

  const [connectwallet, setWalletConnected] = useState<boolean>(false);
  const [approve, setApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [connect, setIsConnected] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [approveAmount, setApproveAmount] = useState<number>(0);
  const web3ModalRef = useRef<any>();
  // const checkIfConnected = localStorage.getItem("connected")
  const getProviderAndSigner = async (): Promise<{
    provider: providers.Web3Provider;
    signer: providers.JsonRpcSigner;
  }> => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 5) {
      toast.warn("Please change network to Goerli", {
        icon: "⚠",
        theme: "dark",
      });
      throw new Error("Please change network to goerli");
    }
    const signer = web3Provider.getSigner();
    return { provider: web3Provider, signer };
  };

  const checkIfUserHasConnectedBefore = async () => {
    const { provider, signer } = await getProviderAndSigner();
    const account = await signer.getAddress();
    console.log(account);
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
      const { provider, signer } = await getProviderAndSigner();
      const UsdcContract = await getUsdcContractInstance(
        UDSCaddress,
        usdcAbi,
        signer
      );
      const approve = await UsdcContract.approve(
        USDCGoerliAddress,
        utils.parseUnits(approveAmount.toString(), 6)
      );
      setApprove(true);
      await approve.wait();
      setApprove(false);
      setIsApproved(true);
      toast.success("The Amount has been approved", {
        icon: "🌠",
        theme: "dark",
      });
    } catch (e: unknown) {
      console.log(e);
      toast.error("The amount was not approved", { icon: "❌", theme: "dark" });
    }
  };

  const fund = async (amount: string) => {
    try {
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
      toast.success("The Smart contract has been successfully funded", {
        icon: "💸",
        theme: "dark",
      });
    } catch (e: unknown) {
      console.log(e);
      toast.error("The smart Contract could not fund the smart contract", {
        icon: "❌",
        theme: "dark",
      });
    }
  };

  const ConnectionWallet = async () => {
    try {
      if (!connectwallet) {
        web3ModalRef.current = new Web3Modal({
          network: "goerli",
          providerOptions: {},
          disableInjectedProvider: false,
        });
      }
      connectWalletFunction();
      setIsConnected(true);
      await checkIfUserHasConnectedBefore();
      toast.success("Successfully connected wallet", {
        icon: "✅",
        theme: "dark",
      });
    } catch (e: unknown) {
      console.log(e);
      toast.error("Wallet encountered error during connection", {
        icon: "🤦‍♂️",
        theme: "dark",
      });
    }
  };

  const connectWalletFunction = async () => {
    try {
      await getProviderAndSigner();
      setWalletConnected(true);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getSessionData() {
      const { provider, signer } = await getProviderAndSigner();
      if (signer) {
        setWalletConnected(true);
        setIsConnected(false);
        setApprove(false);
        console.log("👱‍♀️");
        toast.warning("You have connected before❗❗", {
          icon: "👼",
          theme: "dark",
        });
      }
    }
    setTimeout(() => {
      getSessionData()
    }, 4000);
  }, [connect]);

  const render = () => {
    if (!connectwallet) {
      return (
        <div className="flex flex-col items-center md:flex-row  justify-center max-h-screen space-x-8 ">
          <div className="flex flex-col flex-1 space-y-6  ">
            <motion.div
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              initial={{ opacity: 0 }}
              className="md:text-[50px] text-[20px] font-bold  font-mono w-96 md:ml-4 lg:ml-0 text-white capitalize text-center md:text-left"
            >
              Connect your Wallet to donate 💳
            </motion.div>
            <motion.button
              variants={nextVariant}
              initial="initial"
              animate="animate"
              whileHover={"hover"}
              style={{ transition: "all 0.3s" }}
              className="flex justify-center items-center font-mono hover:shadow-md animate-pulse text-[20px]  transition-all hover:shadow-white bg-black py-4 rounded-3xl w-60 text-white cursor-pointer font-bold scale-75 md:scale-100  md:hover:scale-105 hover:scale-90 ml-14  md:ml-2 lg:ml-0"
              onClick={ConnectionWallet}
            >
              Connect wallet 💱
            </motion.button>
          </div>
          <div className="flex-1 animate-pulse scale-75 md:scale-100">
            <Image src={Draw1} height={"400"} width={"400"} alt="" />
          </div>
        </div>
      );
    } else {
      if (connect) {
        if (approve) {
          return (
            <div className=" animate-bounce text-[20px] font-mono lg:text-[40px] text-white font-bold">
              Approving the smart contract,please wait👏
            </div>
          );
        }
        if (loading) {
          return (
            <div className="text-blue-700">Loading please wait.......</div>
          );
        }
        if (isApproved) {
          return (
            <div className="flex  justify-between items-center  ">
              <div className="flex flex-col justify-center text-center  items-center  ml- space-y-8">
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setDonationAmount(e.target.value);
                  }}
                  className="rounded-3xl ml-[-20px] mt-5  md:ml-0 bg-black border-white w-[250px] py-4 text-white flex items-center justify-center hover:shadow-white text-center outline-none placeholder-white order-2"
                  placeholder="Enter your amount 💲💲"
                />
                <div className="text-[45px] w-96 text-white font-mono font-bold order-1 capitalize">
                  Donate in Usdc to buy a tree
                </div>
                <div
                  className="order-3 flex justify-center items-center font-mono hover:shadow-md animate-pulse text-[20px]  transition-all hover:shadow-white bg-black py-4 rounded-3xl w-60 text-white cursor-pointer font-bold scale-75 md:scale-100  md:hover:scale-105 hover:scale-90 ml-14  md:ml-2 lg:ml-0 "
                  onClick={() => {
                    fund(donationAmount);
                  }}
                >
                  Donate
                </div>
              </div>
              <div className="flex justify-center items-center ml-32 ">
                <Image src={Draw4} height={"400"} width={"400"} alt="" />
              </div>
            </div>
          );
        }
      } else {
        return (
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              variants={nextVariant}
              initial="initial"
              animate="animate"
              className="flex items-stretch flex-[2] justify-center flex-col my-2 space-y-8 "
            >
              <div className="md:text-[50px] mt-4 md:mt-0 text-[30px] font-mono font-bold capitalize text-white">
                Approve the amount 🦠
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-start space-x-4 items-center">
                <span className="text-white text-[23px] font-mono ">
                  Enter your amount:💰
                </span>
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setApproveAmount(parseInt(e.target.value));
                  }}
                  className="rounded-3xl ml-[-20px]  md:ml-0 bg-black border-white w-[250px] py-4 text-white flex items-center justify-center hover:shadow-white text-center outline-none placeholder-white"
                  placeholder="The maximum amount is 1000"
                />
              </div>
              {approveAmount.toString().length > 1 && (
                <motion.button
                  variants={nextVariant}
                  initial="initial"
                  animate="animate"
                  style={{ transition: "all 0.3s" }}
                  className="flex justify-center items-center font-mono hover:shadow-md animate-pulse text-[20px]  transition-all hover:shadow-white bg-black py-4 rounded-3xl w-60 text-white cursor-pointer scale-75 md:scale-100 font-bold md:hover:scale-105 hover:scale-90 ml-16 md:ml-0"
                  onClick={Approve}
                >
                  Approve🦧
                </motion.button>
              )}
            </motion.div>
            <motion.div className="flex-1 animate-pulse md:mt-4 lg:mt-0 scale-75 md:scale-100">
              <Image src={Draw7} height={"400"} width={"400"} alt="" />
            </motion.div>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div>{render()}</div>
    </div>
  );
}
