import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/types">
        <button>Types</button>
      </Link>
      <Link to="/teams">
        <button>Teams</button>
      </Link>
    </>
  );
};

export default Navbar;
