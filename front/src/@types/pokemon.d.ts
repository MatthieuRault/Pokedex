export interface IPokemonType {
  id: number;
  name: string;
  color: string;
  pokemons: IPokemon[];
}

export interface IPokemon {
  id: number;
  name: string;
  hp: number;
  atk: number;
  def: number;
  atk_spe: number;
  def_spe: number;
  speed: number;
  types: IPokemonType[];
}
