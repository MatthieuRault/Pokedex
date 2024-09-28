import { Router } from "express";
import * as pokemonController from "./controllers/pokemonController.js";
import * as typeController from "./controllers/typeController.js";
import * as teamController from "./controllers/teamController.js";
import { controllerWrapper as cw } from "./utils/controllerWrapper.js";

export const router = Router();

// Route pour la liste de Pokémons
router.get("/pokemons", cw(pokemonController.getAllPokemons));
// Route pour un Pokémon
router.get("/pokemons/:id", cw(pokemonController.getOnePokemon));

// Route pour les Types de Pokémons
router.get("/types", cw(typeController.getAllTypes));
// Route pour un Type de Pokémons
router.get("/types/:id", cw(typeController.getOneType));

// Route pour la liste de Teams
router.get("/teams", cw(teamController.getAllTeams));
// Route pour une team
router.get("/teams/:id", cw(teamController.getOneTeam));
// Route pour créer une team
router.post("/teams", cw(teamController.createTeam));
// Route pour modifier une team
router.patch("/teams/:id", cw(teamController.updateTeam));
// Route pour supprimer une team
router.delete("/teams/:id", cw(teamController.deleteTeam));

// Route pour ajouter un Pokemon dans une team
router.put("/teams/:id/pokemons/:id");

// Route pour supprimer un/plusieurs Pokémon(s) de la liste d'une team en question
router.delete("/teams/:id/pokemons/:id");

// Route permettant de voter un Pokémon
router.post("/pokemons/:id/votes");
// Route permettant de voir les 10 pokémons les plus populaires et leur nombre de votes correspondant
router.get("/pokemons/leaderboard");
