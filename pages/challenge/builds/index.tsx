import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../../components/Layout";
import { getLadder } from "../../api/ladder";
import { useTable } from "react-table";
import _ from "lodash";
import { Colors } from "../../../assets/Colors";
import styled from "styled-components";
import Link from "next/link";

const Table = styled.table`
  color: ${Colors.WHITE};
  background: ${Colors.TABLEBACKGROUND};
  text-align: right;
  border-collapse: collapse;
  border-radius: 0.5rem;
`;
const TableTitle = styled.th`
  font-weight: bold;
  padding: 0.8em;
  text-align: left;
  width: 5em;
  border-bottom: 1px solid ${Colors.GREY};
  :first-child {
    border-right: 1px solid ${Colors.GREY};
  }
`;
const TableCell = styled.td`
  padding: 0.8em;
  border-bottom: 1px solid ${Colors.GREY};
  :first-child {
    border-right: 1px solid ${Colors.GREY};
  }
`;
const CharacterLink = styled.div`
  a {
    color: ${Colors.CYAN};
    text-decoration: none;
  }
`;

const Challenge = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const init = async () => {
      let ladderObj = await getLadder();
      setData(_.get(ladderObj, "entries", []));
    };
    init();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Character",
        accessor: "character.name",
        Cell: ({ row, value }) => {
          return (
            <CharacterLink>
              <Link href="/">{value}</Link>
            </CharacterLink>
          );
        },
      },
      { Header: "Level", accessor: "character.level" },
      { Header: "Life", accessor: "" },
      { Header: "ES", accessor: "" },
      { Header: "Depth", accessor: "" },
      { Header: "DPS", accessor: "" },
      { Header: "Skills", accessor: "" },
      { Header: "Keystones", accessor: "" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Layout>
      <h1>Challenge</h1>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableTitle {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableTitle>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Layout>
  );
};
export default Challenge;
