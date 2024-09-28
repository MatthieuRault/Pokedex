import "dotenv/config";

import express from "express";
import cors from "cors";
import { router } from "./app/router.js";

// Création de l'application
const app = express();

// Autorisation des Cross-origin requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mise en place du router
app.use(router);

// Démarrage du serveur
const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`🚀 API demarrée à l'adresse : http://localhost:${port}`);
