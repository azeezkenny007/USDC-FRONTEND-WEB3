import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Usdc from '../components/Usdc'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      <Usdc/>
    </div>
  )
}

export default Home
