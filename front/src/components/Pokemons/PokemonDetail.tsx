import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config";
import axios from "axios";
import { IPokemon } from "../../@types/pokemon";
import "./PokemonDetail.css";

export const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [hp, setHp] = useState(500);
  const [maxPokemonHp, setMaxPokemonHp] = useState<number | null>(null);

  const fetchPokemonById = async () => {
    const res = await axios(`${apiUrl}/pokemons/${id}`);
    setPokemon(res.data);
    setMaxPokemonHp(res.data.hp);
  };

  const attackPlayer = (attack: number) => {
    let newHp = hp - attack;
    if (newHp < 0) {
      newHp = 0;
    }
    setHp(newHp);
  };

  const healPlayer = (heal: number) => {
    let newHp = hp + heal;
    if (newHp > 500) {
      newHp = 500;
    }
    setHp(newHp);
  };

  const percentageHp = () => {
    let percentHp = (hp / 500) * 100;
    return percentHp;
  };

  const percentagePokemonHp = () => {
    if (!pokemon || typeof pokemon.hp !== "number" || !maxPokemonHp) return 0;
    return (pokemon.hp / maxPokemonHp) * 100;
  };

  const attackPokemon = (pokemonHp?: number) => {
    if (pokemonHp === undefined || !pokemon || pokemon.id === undefined) return;

    const attack = 32;
    let newHp = pokemonHp - attack;

    if (newHp < 0) {
      newHp = 0;
    }

    const pokemonDuppl: IPokemon = {
      ...pokemon,
      hp: newHp,
    };

    setPokemon(pokemonDuppl);

    return newHp;
  };

  useEffect(() => {
    fetchPokemonById();
  }, [id]);

  return (
    <div>
      <img src={`/assets/img/${pokemon?.id}.webp`} alt="" />
      <p>{pokemon?.name}</p>
      <p>Nombre de PV : {pokemon?.hp}</p>
      <p>Attaque : {pokemon?.atk}</p>
      <p>Défense : {pokemon?.def}</p>
      <p>Attaque spéciale : {pokemon?.atk_spe}</p>
      <p>Défense spéciale : {pokemon?.def_spe}</p>
      <p>Vitesse : {pokemon?.speed}</p>
      <div>
        <p>Type(s):</p>
        {pokemon?.types.map((type) => (
          <p key={type.id}>{type.name}</p>
        ))}
      </div>
      <div className="player-status">
        <button
          className="button-attack"
          onClick={() => {
            if (pokemon?.atk) {
              attackPlayer(pokemon.atk);
            }
          }}
        >
          Attaquer le joueur
        </button>
        <button
          className="button-heal"
          onClick={() => {
            healPlayer(50);
          }}
        >
          Soigner le joueur
        </button>
      </div>
      <p>
        Player : {hp} hp{" "}
        <progress max="100" value={percentageHp()}>
          {percentageHp().toFixed(2)}
        </progress>
      </p>
      <div className="pokemon-status">
        <button
          className="button-attack"
          onClick={() => {
            attackPokemon(pokemon?.hp);
          }}
        >
          Attaquer {pokemon?.name}
        </button>
      </div>
      <p>
        {pokemon?.name}: {pokemon?.hp} hp{" "}
        <progress max="100" value={percentagePokemonHp()}>
          {percentagePokemonHp().toFixed(2)}
        </progress>
      </p>
    </div>
  );
};
