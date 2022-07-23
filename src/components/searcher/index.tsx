import React, {useState} from "react";
import { Search, Clear } from '@mui/icons-material';
import './index.css'

type Props = {
  updateSearch: Function;
};

export default (props: Props) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updateSearch(search);
  } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  } 

  return (
    <>
      <form onSubmit={handleSubmit} className="wrapper">
        <Search className="icon-left" />
        <Clear className="icon-right" />
        <input className="search" type="text" placeholder="Search..." onChange={handleChange} value={search} />
      </form>
    </>
  )
}