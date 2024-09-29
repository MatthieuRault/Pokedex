import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../config";
import { IPokemon } from "../../@types/pokemon";

interface PokemonSelectorProps {
  onAddPokemon: (pokemonId: number) => void;
}

export const TeamPokemonSelector = ({ onAddPokemon }: PokemonSelectorProps) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | "">("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await axios.get(`${apiUrl}/pokemons`);
      setPokemons(res.data);
    };
    fetchPokemons();
  }, []);

  const handleAddPokemon = () => {
    if (selectedPokemonId !== "") {
      onAddPokemon(Number(selectedPokemonId));
      setSelectedPokemonId("");
    }
  };

  return (
    <div>
      <select
        value={selectedPokemonId}
        onChange={(e) => setSelectedPokemonId(Number(e.target.value))}
      >
        <option value="">Sélectionnez un Pokémon</option>
        {pokemons.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddPokemon}>Ajouter à l'équipe</button>
    </div>
  );
};
