import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Transactions extends React.Component {
  render () {
    const { past, future } = this.props.store
    return <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: 5 }}>Yesterday</h2>
      <ul
        style={{ height: 200, overflow: 'scroll', marginBottom: 10 }}>
        { past.map(toTransaction) }
      </ul>

      <h2 style={{ marginBottom: 5 }}>Tomorrow</h2>
      <ul
        style={{ fontSize: '8px', height: 200, overflow: 'scroll' }}>
        { future.map(toTransaction) }
      </ul>
    </div>

  }
}

function toTransaction(transaction) {
  return <li
    key={ `t-${ transaction.id }`}
    style={{ fontSize: '8px', borderBottom: '1px solid #cccccc' }}
    >
    <p>{ transaction.transactionDescription }</p>
    <p>{ transaction.transactionDateTime.toString() }</p>
  </li>
}
