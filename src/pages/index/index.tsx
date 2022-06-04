import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import { Character } from "../../models/Character";
import { getAll } from "../../services/ApiService";

const Index = () => {
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    getAll().then(response => setData(response))
  }, [])


  return (
    <div>
      <Table data={data} />
    </div>
  );
}

export default Index;
