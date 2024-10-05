import { useEffect, useState } from "react";
import { IPokemonType } from "../../@types/pokemon";
import axios from "axios";
import { apiUrl } from "../../config";
import { Link } from "react-router-dom";

export const TypeList = () => {
  const [types, setTypes] = useState<IPokemonType[]>([]);

  const fetchTypes = async () => {
    const res = await axios.get(`${apiUrl}/types`);
    setTypes(res.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="type-list">
      {types.map((type) => (
        <p key={type.id}>
          <Link to={`/types/${type.id}`} style={{ color: `#${type.color}` }}>
            {type.name}
          </Link>
        </p>
      ))}
    </div>
  );
};
