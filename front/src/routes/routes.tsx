import { createBrowserRouter } from "react-router-dom";
import PokemonList from "../components/Pokemons/PokemonList";
import Page from "../components/Page/Page";
import { PokemonDetail } from "../components/Pokemons/PokemonDetail";
import { TypeList } from "../components/Types/TypeList";
import { TypeDetail } from "../components/Types/TypeDetail";
import { TeamList } from "../components/Teams/TeamList";
import { TeamDetail } from "../components/Teams/TeamDetail";

const routes = [
  {
    path: "/",
    element: (
      <Page>
        <PokemonList />
      </Page>
    ),
  },
  {
    path: "/types",
    element: (
      <Page>
        <TypeList />
      </Page>
    ),
  },
  {
    path: "/types/:id",
    element: (
      <Page>
        <TypeDetail />
      </Page>
    ),
  },
  {
    path: "/teams",
    element: (
      <Page>
        <TeamList />
      </Page>
    ),
  },
  {
    path: "/teams/:id",
    element: (
      <Page>
        <TeamDetail />
      </Page>
    ),
  },
  {
    path: "/pokemons/:id",
    element: (
      <Page>
        <PokemonDetail />
      </Page>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
