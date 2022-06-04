import { Character } from "../../models/Character";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import styles from "./style.module.css";

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

const useTable = (data: any[], page: number, itemsPerPage: number = DEFAULT_ITEMS_PAGE, order:{key:string, direction:string}):{ slice:Character[], range:number[] } => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<Character[]>([]);

  useEffect(() => {
    const range = calculateRange(data, itemsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, itemsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, order]);

  return { slice, range: tableRange };
};

const orderData = (data: any[], order:{key:string, direction:string}, orderField:string, orderDirection:string):Character[] => {
  let dataSorted:Character[] = [];
  console.log(orderField)
  if (orderDirection === 'desc') {
    dataSorted = data.sort((a, b) => {
      if(a[orderField] > b[orderField]) {
        return 1;
      } else if(a[orderField] < b[orderField]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  else {
    dataSorted = data.sort((a, b) => {
      if(a[orderField] < b[orderField]) {
        return 1;
      } else if(a[orderField] > b[orderField]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  console.log(dataSorted);
  return dataSorted;
}

const Table = (props:Props) => {
  const [data, setData] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<{key:string, direction:string}>({key:'', direction:''});
  const { slice, range } = useTable(data, page, props.itemsPerPage, order);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  const requestSort = (key:string) => {
    let newDirection = order.direction === '' ? 'desc' : order.direction === 'desc' ? 'asc' : order.direction === 'asc' ? 'desc' : 'asc';
    setOrder({key: key, direction: newDirection});
    console.log(`order: ${order.direction} - newDirection: ${newDirection} - key:${order.key}`);
    const newData = orderData(data, order, key, newDirection);
    setData(newData);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>Name</th>
          </tr>
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
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
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
