import { useState } from "react";
import { ITeam } from "../../@types/team";

interface TeamFormProps {
  onSubmit: (team: Omit<ITeam, "id">) => void;
  initialData?: Omit<ITeam, "id">;
}

export const TeamForm = ({
  onSubmit,
  initialData = { name: "", description: "" },
}: TeamFormProps) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom de l'équipe"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Description de l'équipe"
      />
      <button type="submit">Enregistrer</button>
    </form>
  );
};
