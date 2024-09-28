import { useEffect, useState } from "react";
import { ITeam } from "../../@types/team";
import axios from "axios";
import { apiUrl } from "../../config";
import { Link } from "react-router-dom";
import { TeamForm } from "./TeamForm";

export const TeamList = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  const fetchTeams = async () => {
    const res = await axios.get(`${apiUrl}/teams`);
    setTeams(res.data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`${apiUrl}/teams/${id}`);
    fetchTeams();
  };

  const handleAdd = async (newTeam: Omit<ITeam, "id">) => {
    await axios.post(`${apiUrl}/teams`, newTeam);
    fetchTeams();
    setIsAddingTeam(false);
  };

  return (
    <div className="team-list">
      {teams.map((team) => (
        <div key={team.id}>
          <Link to={`/teams/${team.id}`}>{team.name}</Link>
          <button onClick={() => handleDelete(team.id)}>Supprimer</button>
        </div>
      ))}
      {isAddingTeam ? (
        <TeamForm onSubmit={handleAdd} />
      ) : (
        <button onClick={() => setIsAddingTeam(true)}>
          Ajouter une équipe
        </button>
      )}
    </div>
  );
};
