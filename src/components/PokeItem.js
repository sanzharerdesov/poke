import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { Tag } from 'antd'
import PropTypes from 'prop-types'

import Modal from 'antd/lib/modal/Modal'
import PokeItemModal from './PokeItemModal'
import getColor from './Constants'

const PokeItem = (props) => {
  const [pokeData, setPokeData] = useState([])
  const [isModal, setIsModal] = useState(false)

  async function fetchData () {
    if (props.data) {
      setPokeData(props.data)
    } else {
      const res = await fetch(props.url)
      res.json()
        .then(res => {
          setPokeData(res)
        })
        .catch(() => null)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return useObserver(() => (
    <div className="poke_item_body" onClick={() => setIsModal(!isModal)}>
      <Modal
        title={props.name}
        visible={isModal}
        onOk={() => setIsModal(false)}
        onCancel={() => setIsModal(false)}
      >
        <PokeItemModal data={pokeData} name={props.name}/>
      </Modal>
      <div>{pokeData.sprites ? <img src={pokeData.sprites.front_default} alt={props.name} /> : ''}</div>
      <div><h3 className="no_margin">{props.name}</h3></div>
      <div><h4 className="no_margin">ID: {pokeData.id}</h4></div>
      <div><h4 className="no_margin">Experience: {pokeData.base_experience}</h4></div>
      <div><h4 className="no_margin">Height: {pokeData.height}</h4></div>
      <div><h4 className="no_margin">Weight: {pokeData.weight}</h4></div>
      <div>
        {pokeData.types
          ? pokeData.types.map(
            (titem, idx) => (
              <div key={titem + idx}>
                <Tag color={getColor(titem.type.name)} className="no_margin">
                  {titem.type.name}
                </Tag>
              </div>)
          ) : ''}
      </div>

    </div>
  ))
}
PropTypes.propTypes = {
  data: PropTypes.node,
  pokeData: PropTypes.object.isRequired
}
export default PokeItem
