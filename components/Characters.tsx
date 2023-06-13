import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Character from "./Character";

type CharacterProps = {
  name: string;
  image: string;
  id: number;
  status : string;
  species : string;
  location : string;
  
};

type Props = {};

export default function Characters({}: Props) {
  const fetchCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data.results.map((character: any) => ({
      id: character.id,
      name: character.name,
      image: character.image,
      status: character.status,
      species: character.species,
      location: character.location.name,
    }));
  };

  const { data, isLoading, isError } = useQuery<CharacterProps[]>("characters", fetchCharacters);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className=" font-bold font-mono py-2 grid grid-cols-4 w-full justify-center items-center">
     {data?.map((character) => (
    
       <Character key={character.id} character={character} />
       
    ))}
    </div>
  );
}
