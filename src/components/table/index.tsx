import { Character } from "../../models/Character";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  data: Character[],
  itemsPerPage?: number
}

const DEFAULT_ITEMS_PAGE = 10;

const calculateRange = (data: any[], itemsPerPage: number = DEFAULT_ITEMS_PAGE):number[] => {
  return Array.from({length: Math.ceil(data.length / itemsPerPage)}, (x, i) => i+1);
}

const sliceData = (data: any[], page: number, itemsPerPage: number = DEFAULT_ITEMS_PAGE):Character[] => {
  return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};

const useTable = (data: any[], page: number, itemsPerPage: number = DEFAULT_ITEMS_PAGE):{ slice:Character[], range:number[] } => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<Character[]>([]);

  useEffect(() => {
    const range = calculateRange(data, itemsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, itemsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

const Table = (props:Props) => {

  const [page, setPage] = useState<number>(1);
  const { slice, range } = useTable(props.data, page, props.itemsPerPage);

  

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <>
      <table>
        <thead>
          <th>
            <td>Name</td>
          </th>
        </thead>
        <tbody>
          {slice.map((e)=> {
            return (
              <tr key={e.name}>
                <td>{e.name}</td>
                <td><Link to={`/details/${e.name}`}>Go to Details</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
      {range.map((el, index) => (
        <button
          key={index}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
    </>
  );
}

export default Table;
