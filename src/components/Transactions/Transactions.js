import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Transactions extends React.Component {
  render () {
    const { past } = this.props.store
    return <ul className="transactions container">
      { past.map(toTransaction) }
    </ul>
  }
}

function toTransaction(transaction) {
  return <li key={ `t-${ transaction.transactionDateTime.getTime() }`} >
    <p>{ transaction.transactionDescription }</p>
    <p>{ transaction.transactionAmount } </p>
    <p>{ transaction.accountBalance }</p>
    <hr />
  </li>
}
