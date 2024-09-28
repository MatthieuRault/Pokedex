import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ITeam } from "../../@types/team";
import axios from "axios";
import { apiUrl } from "../../config";
import { TeamForm } from "./TeamForm";

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
            </div>
          ))}
      </div>
    </div>
  );
};
