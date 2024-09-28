import { Team, Pokemon } from "../models/associations.js";

export const getAllTeams = async (req, res) => {
  // Récupérer la liste des teams
  const teams = await Team.findAll();
  res.json(teams);
};

export const getOneTeam = async (req, res) => {
  // Récupérer l'ID d'une team
  const teamId = parseInt(req.params.id);

  if (isNaN(teamId)) {
    return res
      .status(404)
      .json({ error: "team not found. Please verify the provided ID." });
  }

  // Récupérer la team en BDD avec ses pokémons
  const team = await Team.findByPk(teamId, {
    include: "pokemons",
  });
  if (!team) {
    return res
      .status(404)
      .json({ error: "team not found. Please verify the provided ID." });
  }

  res.json(team);
};

export const createTeam = async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string") {
    res
      .status(400)
      .json({ error: "Property 'name' should be a non empty string." });
    return;
  }

  const createdTeam = await Team.create({
    name,
    description,
  });

  res.status(201).json(createdTeam);
};

export const updateTeam = async (req, res) => {
  // Récupérer l'ID de la team à update
  const teamId = parseInt(req.params.id);

  // On vérifie si l'ID de la team est valide
  if (isNaN(teamId)) {
    return res
      .status(404)
      .json({ error: "Team not found. Please verify the provided ID." });
  }

  // Récupérer la team en BDD
  const team = await Team.findByPk(teamId);

  // Si elle n'existe pas renvoyer une 404
  if (!team) {
    return res
      .status(404)
      .json({ error: "Team not found. Please verify the provided ID." });
  }

  // Update de la team
  if (req.body.name) {
    team.name = req.body.name;
  }
  if (req.body.description) {
    team.description = req.body.description;
  }

  await team.save();
  res.json(team);
};

export const deleteTeam = async (req, res) => {
  // Récupérer l'ID de la team à supprimer de la BDD
  const teamId = parseInt(req.params.id);

  // On vérifie si l'ID de la team est valide
  if (isNaN(teamId)) {
    return res
      .status(404)
      .json({ error: "Team not found. Please verify the provided ID." });
  }

  // Récupérer la team en BDD
  const team = await Team.findByPk(teamId);

  // Si elle n'existe pas renvoyer une 404
  if (!team) {
    return res
      .status(404)
      .json({ error: "Team not found. Please verify the provided ID." });
  }

  // Supprimer la team
  await team.destroy();

  res.status(204).end(); // Renvoie un No Content (204)
};
