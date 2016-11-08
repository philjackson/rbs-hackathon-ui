import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Transactions extends React.Component {
  render () {
    const { transactions } = this.props.store
    return <ul className="transactions container">
      { transactions.map(toTransaction) }
    </ul>
  }
}

function toTransaction(transaction) {
  return <li key={ `t-${ transaction.transactionDateTime.getTime() }`} >
    { transaction.transactionDescription }
  </li>
}
