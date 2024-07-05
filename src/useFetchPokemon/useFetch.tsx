import { useEffect, useState } from 'react';

export const useFetch = () => {
  const [isloading, setIsLoading] = useState<Boolean>(false);
  const [pokemon, setPokemon] = useState<any>([]);
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  
  const handleFetch = async () => {
    setIsLoading(true);
    const request = await fetch(currentUrl);
    const response = await request.json();
    const { results } = response;
    setPokemon(results);
    console.log(response);
    setNextUrl(response.next || '')
    setPrevUrl(response.previous || '')
    setIsLoading(false);

    let PokemonList: any = [];
    results.map(async (item: any, index: number) => {
      const req = await fetch(item.url);
      const res = await req.json();
      PokemonList[index] = res;
      setPokemonDetail(...[PokemonList]);
    });

    console.log(PokemonList);
  };

  useEffect(() => {
    handleFetch();
  }, [currentUrl]);

  return { pokemon, isloading, pokemonDetail, nextUrl, prevUrl, setCurrentUrl };
};
