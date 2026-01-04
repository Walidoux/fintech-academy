import 'katex/dist/katex.min.css'

import { Route, Router } from '@solidjs/router'
import type { Component } from 'solid-js'

import Docs from './components/docs'

const Home: Component = () => {
  return (
    <div class='p-8'>
      <h1 class='font-bold text-2xl'>Financial Analysis Docs</h1>
      <p>Select a document from the navigation.</p>
    </div>
  )
}

const App: Component = () => {
  return (
    <Router>
      <Route component={Home} path='/' />
      <Route component={Docs} path='/docs/*' />
    </Router>
  )
}

export default App
