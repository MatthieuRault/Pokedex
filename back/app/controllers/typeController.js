import { Type } from "../models/associations.js";

export const getAllTypes = async (req, res) => {
  // Récupérer la liste des Types
  const types = await Type.findAll({
    include: "pokemons",
  });
  res.json(types);
};

export const getOneType = async (req, res) => {
  // Récupérer l'ID d'un type
  const typeId = parseInt(req.params.id);

  if (isNaN(typeId)) {
    return res
      .status(404)
      .json({ error: "Type not found. Please verify the provided ID." });
  }

  // Récupérer le Type en BDD
  const type = await Type.findByPk(typeId, {
    include: "pokemons",
  });
  if (!type) {
    return res
      .status(404)
      .json({ error: "Type not found. Please verify the provided ID." });
  }

  res.json(type);
};
