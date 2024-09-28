import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPokemonType } from "../../@types/pokemon";
import axios from "axios";
import { apiUrl } from "../../config";

export const TypeDetail = () => {
  const { id } = useParams();
  const [type, setType] = useState<IPokemonType>();

  const fetchTypeById = async () => {
    const res = await axios(`${apiUrl}/types/${id}`);
    setType(res.data);
  };

  useEffect(() => {
    fetchTypeById();
  }, [id]);

  return (
    <div>
      <p style={{ color: `#${type?.color}` }}>{type?.name}</p>
      <div className="pokemon-grid">
        {type?.pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-item">
            <p>{pokemon.name}</p>
            <Link to={`/pokemons/${pokemon.id}`}>
              <img src={`/assets/img/${pokemon.id}.webp`} alt={pokemon.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
