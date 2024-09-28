import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../config";
import { PokemonCard } from "./PokemonCard";
import { IPokemon } from "../../@types/pokemon";

const PokemonList = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const fetchPokemons = async () => {
    const res = await axios(`${apiUrl}/pokemons`);
    setPokemons(res.data);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
