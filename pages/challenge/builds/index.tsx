import React, { useEffect, useState, useMemo } from 'react'
import Layout from '../../../components/Layout'
import { getLadder } from '../../api/ladder'
import { useTable, Cell } from 'react-table'
import _ from 'lodash'
import { Colors } from '../../../assets/Colors'
import styled from 'styled-components'
import Link from 'next/link'
import ClassUsageRateComponent from '../../../components/ClassUsageRate'

const Container = styled.div`
  margin-top: 8px;
  display: flex;
`
const LeftContainer = styled.div`
  max-width: 215px;
  width: 100%;
  margin-right: 8px;
`
const RightContainer = styled.div`
  flex: 1;
`
const CharacterFoundContainer = styled.div`
  width: 100%;
  height: 56px;
  background: ${Colors.GRIDBACKGROUND};
  border-radius: 0.5rem;
  margin-bottom: 8px;
  color: ${Colors.WHITE};
  display: flex;
  align-items: center;
  display: flex;
  padding: 0 10px;
`
const SearchFilterContainer = styled.div`
  width: 100%;
  height: 56px;
  background: ${Colors.GRIDBACKGROUND};
  border-radius: 0.5rem;
  margin-bottom: 8px;
`
const GridTitle = styled.div`
  color: ${Colors.GREYTITLE};
  padding: 10.5px;
  font-size: 12.25px;
  font-weight: bold;
`
const Items = styled.div`
  width: 100%;
  height: 100%;
  max-height: 392px;
  background: ${Colors.GRIDBACKGROUND};
  border-radius: 0.5rem;
  margin-bottom: 8px;
`
const MainSkill = styled.div`
  width: 100%;
  height: 100%;
  max-height: 392px;
  background: ${Colors.GRIDBACKGROUND};
  border-radius: 0.5rem;
  margin-bottom: 8px;
`

const Table = styled.table`
  color: ${Colors.WHITE};
  background: ${Colors.TABLEBACKGROUND};
  border-collapse: collapse;
  border-radius: 0.5rem;
  width: 100%;
`
const TableTitle = styled.th`
  font-weight: bold;
  padding: 0.8em;
  text-align: left;
  width: 5em;
  border-bottom: 1px solid ${Colors.GREY};
  :first-child {
    border-right: 1px solid ${Colors.GREY};
  }
`
const TableCell = styled.td`
  padding: 0.8em;
  border-bottom: 1px solid ${Colors.GREY};
  :first-child {
    border-right: 1px solid ${Colors.GREY};
  }
`
const CharacterLink = styled.div`
  a {
    color: ${Colors.CYAN};
    text-decoration: none;
  }
`
const Setting = styled.div`
  height: 130px;
  width: 100%;
`
const Avatar = styled.img`
  width: 35px;
  height: 28px;
  margin-left: 5px;
`
const LevelCell = styled.div`
  display: flex;
  align-items: center;
`

const Challenge = () => {
  const [data, setData] = useState([])
  const rateInit = {
    Ascendant: 0,
    Assassin: 0,
    Berserker: 0,
    Champion: 0,
    Chieftain: 0,
    Deadeye: 0,
    Elementalist: 0,
    Gladiator: 0,
    Guardian: 0,
    Hierophant: 0,
    Inquisitor: 0,
    Juggernaut: 0,
    Necromancer: 0,
    Occultist: 0,
    Pathfinder: 0,
    Raider: 0,
    Saboteur: 0,
    Slayer: 0,
    Trickster: 0,
  }
  const [classUseRate, setClassUseRate] = useState(rateInit)

  useEffect(() => {
    const init = async () => {
      let ladderObj = await getLadder()
      setData(_.get(ladderObj, 'entries', []))
    }
    init()
  }, [])

  useEffect(() => {
    let rate = { ...rateInit }
    data.map((player) => {
      rate[player.character.class] += 1
    })
    // account average rate.
    Object.keys(rate).map((key) => (rate[key] = (rate[key] * 100) / data.length))
    setClassUseRate(rate)
  }, [data])

  const columns = useMemo(
    () => [
      {
        Header: 'Character',
        accessor: 'character.name',
        Cell: ({ value }: Cell) => {
          return (
            <CharacterLink>
              <Link href="/">{value}</Link>
            </CharacterLink>
          )
        },
      },
      { Header: 'Rank', accessor: 'rank' },
      {
        Header: 'Level',
        accessor: 'character.level',
        Cell: ({ row, value }: Cell) => {
          const classType = _.get(row, "values['character.class']", '')
          return (
            <LevelCell>
              {value}
              <Avatar src={`/${classType}_avatar.png`} />
            </LevelCell>
          )
        },
      },
      {
        Header: 'Class',
        accessor: 'character.class',
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <Layout>
      <Setting />
      <ClassUsageRateComponent data={classUseRate} />
      <Container>
        <LeftContainer>
          <SearchFilterContainer />
          <Items>
            <GridTitle>ITEMS</GridTitle>
          </Items>
          <MainSkill>
            <GridTitle>MAIN SKILL (5+ LINKS)</GridTitle>
          </MainSkill>
        </LeftContainer>
        <RightContainer>
          <CharacterFoundContainer>
            <div>Found {data.length} characters.</div>
          </CharacterFoundContainer>
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableTitle {...column.getHeaderProps()}>{column.render('Header')}</TableTitle>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </RightContainer>
      </Container>
    </Layout>
  )
}
export default Challenge
