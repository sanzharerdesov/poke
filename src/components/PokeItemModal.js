import React from 'react'
import { Tag } from 'antd'
import PropTypes from 'prop-types'

import getColor from './Constants'

const PokeItemModal = (props) => {
  return <div className="poke_item_body">
    <div className="modal_img">{props.data.sprites ? <img src={props.data.sprites.front_default} alt={props.name} /> : ''}</div>
    <div><h3 className="no_margin">{props.name}</h3></div>

    <div className="modal_body">
      <div style={{ width: '50%' }}>
        <div><h4 className="no_margin">Experience: {props.data.base_experience}</h4></div>
        <div><h4 className="no_margin">Height: {props.data.height}</h4></div>
        <div><h4 className="no_margin">Weight: {props.data.weight}</h4></div>
        <div>
          {props.data.types
            ? props.data.types.map(
              (titem, idx) => (
                <div key={titem + idx}>
                  <Tag color={getColor(titem.type.name)} className="no_margin">
                    {titem.type.name}
                  </Tag>
                </div>)
            ) : ''}
        </div>

      </div>
      <div style={{ width: '50%' }}>
        <div><h4 className="no_margin">base_stat: {
          props.data.stats ? props.data.stats.map(
            (item, idx) => (
              <div key={item + idx}>{item.stat.name}: {item.base_stat}</div>
            )) : ''}</h4>
        </div>
      </div>
    </div>

  </div>
}

PokeItemModal.propTypes = {
  name: PropTypes.string
}
export default PokeItemModal
