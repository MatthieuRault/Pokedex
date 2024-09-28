import { Link } from "react-router-dom";
import { IPokemon } from "../../@types/pokemon";
import "./Pokemon.css";

interface PokemonCardProps {
  pokemon: IPokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="pokemon-card">
      <p>
        N° {pokemon.id} {pokemon.name}
      </p>
      <Link to={`/pokemons/${pokemon.id}`}>
        <img src={`assets/img/${pokemon.id}.webp`} alt="" />
      </Link>
    </div>
  );
};
