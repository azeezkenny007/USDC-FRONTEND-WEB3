import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Character from "./Character";

type CharacterProps = {
  name: string;
  image: string;
  id: number;
  status: string;
  species: string;
  location: string;
};

const styles = {
  button:
    "py-2 px-10 rounded-3xl my-9 hover:bg-gray-800  text-center font-mono font-bold bg-black text-white",
};



type Props = {};

export default function Characters({}: Props) {
  const [page, setPage] = useState(7);

  const pageController = (arithemeticValue:string)=>{
    if(page<1){
      setPage(1)
    }
    if(arithemeticValue ==="add"){
      setPage(page+1)
    }
    if(arithemeticValue ==="subtract"){
      setPage(page-1)
    } 


  }
  const fetchCharacters = async ({ queryKey }: any) => {
    console.log(queryKey);
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
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

  const { data, isLoading, isError } = useQuery<CharacterProps[]>(
    ["characters", page],
    fetchCharacters
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div className=" font-bold font-mono my-2 rounded-lg grid grid-cols-4 w-full justify-center items-center">
        {data?.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          disabled={page<2}
          className={styles.button}
          onClick={() => pageController("subtract")}
        >
          Previous
        </button>
        <button
          className={styles.button}
          onClick={() => pageController("add")}
        >
          Next page
        </button>
      </div>
    </div>
  );
}
