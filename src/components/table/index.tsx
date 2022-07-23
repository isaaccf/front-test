import { Character } from "models/Character";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./index.css";
import { Pagination } from "@mui/material";

type Props = {
  data: Character[];
  itemsPerPage?: number;
};

const DEFAULT_ITEMS_PAGE = 10;

const calculateRange = (
  data: Character[] = [],
  itemsPerPage: number = DEFAULT_ITEMS_PAGE
): number[] => {
  return Array.from(
    { length: Math.ceil(data.length / itemsPerPage) },
    (x, i) => i + 1
  );
};

const sliceData = (
  data: any[],
  page: number,
  itemsPerPage: number = DEFAULT_ITEMS_PAGE
): Character[] => {
  return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};

const useTable = (
  data: any[],
  page: number,
  itemsPerPage: number = DEFAULT_ITEMS_PAGE,
  order: { key: string; direction: string }
): { pageData: Character[]; range: number[] } => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [pageData, setPageData] = useState<Character[]>([]);

  useEffect(() => {
    const range = calculateRange(data, itemsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, itemsPerPage);
    setPageData([...slice]);
  }, [data, setTableRange, page, setPageData, order, itemsPerPage]);

  return { pageData, range: tableRange };
};

const orderData = (
  data: any[],
  order: { key: string; direction: string },
  orderField: string,
  orderDirection: string
): Character[] => {
  let dataSorted: Character[] = [];
  console.log(orderField);
  if (orderDirection === "desc") {
    dataSorted = data.sort((a, b) => {
      if (a[orderField] > b[orderField]) {
        return 1;
      } else if (a[orderField] < b[orderField]) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    dataSorted = data.sort((a, b) => {
      if (a[orderField] < b[orderField]) {
        return 1;
      } else if (a[orderField] > b[orderField]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  console.log(dataSorted);
  return dataSorted;
};

const Table = (props: Props) => {
  const [data, setData] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<{ key: string; direction: string }>({
    key: "",
    direction: "",
  });
  const { pageData, range } = useTable(data, page, props.itemsPerPage, order);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  useEffect(() => {
    if (pageData.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [pageData, page, setPage]);

  const requestSort = (key: string) => {
    let newDirection =
      order.direction === ""
        ? "desc"
        : order.direction === "desc"
        ? "asc"
        : order.direction === "asc"
        ? "desc"
        : "asc";
    setOrder({ key: key, direction: newDirection });
    const newData = orderData(data, order, key, newDirection);
    setData(newData);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  return (
    <div className="styled-table">
      <table>
        <thead>
          <tr>
            <th className="center" onClick={() => requestSort("name")}>Name</th>
            <th className="center" onClick={() => requestSort("house")}>House</th>
            <th className="center" onClick={() => requestSort("dateOfBirth")}>Birth</th>
            <th className="center">Alive</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.house}</td>
                <td className="center">{e.dateOfBirth}</td>
                <td className="center">{e.alive ? `✔️​` : `☠️`}</td>
                <td>
                  <Link to={`/details/${e.name}`}>Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination className="paginator" variant="outlined" showFirstButton showLastButton shape="rounded" size="large" count={range.length} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default Table;
