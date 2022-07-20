import { useEffect, useState } from "react";
import Table from "components/table";
import { Character } from "models/Character";
import { getAll } from "services/ApiService";

const Index = () => {
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    getAll().then(setData)
  }, [])


  return (
    <div>
      <Table data={data} />
    </div>
  );
}

export default Index;
