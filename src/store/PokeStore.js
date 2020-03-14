import React, { createContext } from 'react'
import { useLocalStore } from 'mobx-react-lite'
import PropTypes from 'prop-types'

export const pokeContext = createContext()

const PokeProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    count: 1,
    increment () {
      store.count++
    },
    decrement () {
      store.count--
    }
  }))

  return (
    <pokeContext.Provider value={store}>{children}</pokeContext.Provider>
  )
}

PokeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default PokeProvider
