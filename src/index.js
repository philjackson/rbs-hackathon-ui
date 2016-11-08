import './styles/index.scss'

import React    from 'react'
import ReactDOM from 'react-dom'

import App      from './routes'


const root      = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)
