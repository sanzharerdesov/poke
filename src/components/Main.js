import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react-lite'
// import { pokeContext } from '../store/PokeStore'
// import {axios} from 'axios';

import './Main.scss'
import PokeItem from './PokeItem'
import { Pagination, Input, Select, Button } from 'antd'

const { Option } = Select
const { Search } = Input

const Main = () => {
  // const store = useContext(pokeContext)
  const [pokeData, setPokeData] = useState([])
  const [pokeItem, setPokeItem] = useState('')
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [searchBy, setSearchBy] = useState('Name')
  const [searchValue, setSearchValue] = useState('')
  const [isResetVisible, setIsResetVisible] = useState(false)

  async function fetchData (offset, limit) {
    setIsResetVisible(false)
    setSearchValue('')
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit)
    res.json()
      .then(res => { setPokeData(res.results) })
      .catch((e) => console.log(`Error: ${e}`))
  }

  async function searchData (value) {
    switch (searchBy) {
      case 'Name': {
        const resName = await fetch('https://pokeapi.co/api/v2/pokemon/' + value)
        resName.json()
          .then(res => { setPokeData(null); setPokeItem(res) })
          .catch((e) => console.log(`Error: ${e}`))
      }
        break
      case 'Type':
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchData(limit, offset)
  }, [limit, offset])

  function onShowSizeChange (offset, limit) {
    setLimit(limit)
  }

  function onChangePage (value) {
    setOffset(limit * (value - 1))
  }

  function onSearchData (value) {
    // setSearchValue(value);
    searchData(value)
    setIsResetVisible(true)
  }

  return useObserver(() => (
    <div className="main_body">
      <div className="search_button">
        <Input.Group compact style={{ display: 'flex' }}>
          <Select style={{ width: '30%' }} defaultValue={searchBy} onChange={setSearchBy}>
            <Option value="Name">Name</Option>
            <Option value="Type">Type</Option>
          </Select>
          <Search
            style={{ width: '70%', display: 'flex' }}
            placeholder="Поиск"
            size={'large'}
            value={searchValue}
            onSearch={value => onSearchData(value)}
            onChange={e => {
              setSearchValue(e.target.value)
            }}

          />
        </Input.Group>
        {
          isResetVisible &&
          <Button onClick={fetchData(limit, offset)}>
            Reset
          </Button>
        }
      </div>
      <div className="main_poke_body">
        {Array.isArray(pokeData) && pokeData.map((item, idx) => (
          <div className="poke_item" key={item.name + idx}>
            <PokeItem name={item.name} url = {item.url} />
          </div>
        ))}
        {
          (!Array.isArray(pokeData)) && pokeItem && pokeItem.id &&
          <div className="poke_item" key={pokeItem.name}>
            <PokeItem name={pokeItem.name} url = {pokeItem.url} data={pokeItem}/>
          </div>
        }
      </div>
      <div>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          total={500}
          onChange={onChangePage}
        />
      </div>
    </div>
  ))
}
export default Main
