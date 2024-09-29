import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ITeam } from "../../@types/team";
import axios from "axios";
import { apiUrl } from "../../config";
import { TeamForm } from "./TeamForm";
import { TeamPokemonSelector } from "./TeamPokemonSelector";

export const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<ITeam | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTeamById = async () => {
    try {
      const res = await axios.get(`${apiUrl}/teams/${id}`);
      setTeam(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'équipe:", error);
      setTeam(null);
    }
  };

  useEffect(() => {
    fetchTeamById();
  }, [id]);

  const handleUpdate = async (updatedTeam: Omit<ITeam, "id">) => {
    await axios.patch(`${apiUrl}/teams/${id}`, updatedTeam);
    fetchTeamById();
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await axios.delete(`${apiUrl}/teams/${id}`);
    navigate("/teams");
  };

  const handleAddPokemon = async (pokemonId: number) => {
    if (team && team.pokemons && team.pokemons.length < 6) {
      await axios.put(`${apiUrl}/teams/${id}/pokemons/${pokemonId}`);
      fetchTeamById();
    } else {
      alert("Une équipe ne peut pas avoir plus de 6 Pokémon !");
    }
  };

  const handleRemovePokemon = async (pokemonId: number) => {
    await axios.delete(`${apiUrl}/teams/${id}/pokemons/${pokemonId}`);
    fetchTeamById();
  };

  if (!team) return <div>Chargement...</div>;

  return (
    <div>
      {isEditing ? (
        <TeamForm
          onSubmit={handleUpdate}
          initialData={{
            name: team.name,
            description: team.description,
            pokemons: team.pokemons || [],
          }}
        />
      ) : (
        <>
          <p className="team-name">{team.name}</p>
          <p>{team.description}</p>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </>
      )}
      {team.pokemons && team.pokemons.length < 6 && (
        <TeamPokemonSelector onAddPokemon={handleAddPokemon} />
      )}
      <div className="pokemon-grid">
        {team.pokemons &&
          team.pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-item">
              <Link to={`/pokemons/${pokemon.id}`}>
                <img
                  src={`/assets/img/${pokemon.id}.webp`}
                  alt={pokemon.name}
                />
              </Link>
              <p>{pokemon.name}</p>
              <button onClick={() => handleRemovePokemon(pokemon.id)}>
                Supprimer
              </button>
            </div>
          ))}
      </div>
      <p>
        Pokémon dans l'équipe : {team.pokemons ? team.pokemons.length : 0}/6
      </p>
    </div>
  );
};
