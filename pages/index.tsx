import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Usdc from '../components/Usdc'
import Characters from '../components/Characters'

const Home: NextPage = () => {
  return (
    <div className='bg-emerald-900 text-black h-screen flex items-center justify-center'>
   
      // <div >
          {/* <div className='capitalize text-4xl font-extrabold py-2 font-mono text-center'>Rich and morty</div> */}
       <Usdc/>
      </div>
    // </div>
  )
}

export default Home
