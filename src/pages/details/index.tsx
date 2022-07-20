import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Character } from "models/Character";
import { getByName } from "services/ApiService";

const Details = () => {
  const urlParams = useParams();
  const [chraracterData, setCharacterData] = useState<Character>();

  useEffect(() => {
    setCharacterData(getByName(urlParams.name ||''));
  }, [])

  return (
    <div>
      DETAILS {chraracterData?.name}<br />
      House: {chraracterData?.house} <br />
      <Link to="/">Go to Index</Link>
    </div>
  );
  }
  
  export default Details;
  