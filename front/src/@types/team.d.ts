export interface ITeam {
  id: number;
  name: string;
  description: string | null;
  pokemons?: IPokemon[];
}
