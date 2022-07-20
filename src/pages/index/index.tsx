import { useEffect, useState } from "react";
import Table from "components/table";
import { Character } from "models/Character";
import { getAll, searchCharacter } from "services/ApiService";
import Searcher from "components/searcher";

const Index = () => {
  const [data, setData] = useState<Character[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAll().then(setData);
  }, []);

  useEffect(() => {
    setData(searchCharacter(search));
  }, [search]);

  return (
    <>
      <h1>Harry Potter Characters</h1>
      <div>
        <Searcher updateSearch={setSearch} />
        <Table data={data} />
      </div>
    </>
  );
};

export default Index;
