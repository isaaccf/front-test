import React, {useState} from "react";

type Props = {
  updateSearch: Function;
};

export default (props: Props) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    props.updateSearch(e.target.value);
  } 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." onChange={handleChange} value={search} />
      </form>
    </>
  )
}