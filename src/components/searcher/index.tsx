import React, {useState} from "react";
import { Search, Clear } from '@mui/icons-material';
import './index.css'

type Props = {
  updateSearch: Function;
};

const initialSearch = '';

export default (props: Props) => {
  const [search, setSearch] = useState(initialSearch);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updateSearch(search);
  } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    props.updateSearch(search);
  }

  const handleResest = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSearch(initialSearch);
    props.updateSearch(initialSearch);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="wrapper">
        <Search className="icon-left" />
        <span data-testid="clear-span" className={search === '' ? 'hidden' : ''} onClick={handleResest}><Clear className="icon-right" /></span>
        <input className="search" type="text" placeholder="Search..." onChange={handleChange} value={search} />
      </form>
    </>
  )
}