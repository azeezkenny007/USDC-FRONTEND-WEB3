import React from 'react'

type CharacterProps = {
 name: string;
 image: string;
 id: number;
 status : string;
 species : string;
 location : string;
 
};
export default function Character({ character }: { character: CharacterProps }) {
 const { id, image, location, name, species, status } = character;
  return (
    <div className='flex justify-center bg-gray-900 rounded-lg text-white m-3 items-center gap-y-3  p-4 w-72 h-44 gap-2 py-4'>
        <img className='h-24 rounded-md' src={image} alt="" />
        <div className='text-xs flex flex-col py-10'>
          <h1>{name}</h1>
          <p>{status} -  {species} </p>
          <p>Last known location:</p>
          <p>{location}</p>
        </div>
    </div>
  )
}