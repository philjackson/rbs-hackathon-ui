import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Transactions extends React.Component {
  render () {
    const { past, future } = this.props.store
    return <div style={{ padding: 10 }}>
      <h2>Yesterday</h2>
      <ul style={{ height: 200, overflow: 'scroll', marginBottom: 10 }}>
        { past.map(toTransaction) }
      </ul>

      <h2>Tomorrow</h2>
      <ul style={{ height: 200, overflow: 'scroll' }}>
        { future.map(toTransaction) }
      </ul>
    </div>

  }
}

function toTransaction(transaction) {
  return <li key={ `t-${ transaction.id }`} >
    <p>{ transaction.transactionDescription }</p>
    <p>{ transaction.transactionAmount } </p>
    <p>{ transaction.accountBalance }</p>
    <p>{ transaction.category }</p>
    <p>{ transaction.transactionType }</p>
    <hr />
  </li>
}
