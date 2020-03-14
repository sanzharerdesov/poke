import React from 'react'

import PokeProvider from './store/PokeStore'
import Main from './components/Main'
import './App.css'
import 'antd/dist/antd.css'

function App () {
  return (
    <PokeProvider>
      <Main />
    </PokeProvider>
  )
}

export default App
