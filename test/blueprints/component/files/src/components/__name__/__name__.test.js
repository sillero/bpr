import React from 'react'
import ReactDOM from 'react-dom'
import <%= changeCase.pascalCase(name) %> from './<%= changeCase.pascalCase(name) %>'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<<%= changeCase.pascalCase(name) %> />, div)
})
