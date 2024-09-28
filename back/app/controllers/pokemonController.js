import { Pokemon, Type } from "../models/associations.js";

export const getAllPokemons = async (req, res) => {
  // Récupérer la liste des Pokémons
  const pokemons = await Pokemon.findAll({
    include: ["types"],
  });
  res.json(pokemons);
};

export const getOnePokemon = async (req, res) => {
  // Récupérer l'ID d'un Pokémon
  const pokemonId = parseInt(req.params.id);

  if (isNaN(pokemonId)) {
    return res
      .status(404)
      .json({ error: "Pokemon not found. Please verify the provided ID." });
  }

  // Récupérer le Pokémon en BDD
  const pokemon = await Pokemon.findByPk(pokemonId, {
    include: "types",
  });
  if (!pokemon) {
    return res
      .status(404)
      .json({ error: "Pokemon not found. Please verify the provided ID." });
  }

  res.json(pokemon);
};
