import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Transactions extends React.Component {
  render () {
    const { last24h, next24h } = this.props.store
    return <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: 5 }}>Last 24 hours</h2>
      <ul
        style={{ height: 200, overflow: 'scroll', marginBottom: 10 }}>
        { last24h.map(toTransaction) }
      </ul>

      <h2 style={{ marginBottom: 5 }}>Next 24 hours</h2>
      <ul
        style={{ height: 200, overflow: 'scroll' }}>
        { next24h.map(toTransaction) }
      </ul>
    </div>

  }
}

function toTransaction(transaction) {
  return <li
    key={ `t-${ transaction.id }` }
    style={{ fontSize: '10px', borderBottom: '1px solid #cccccc' }}
    >
      { Object.keys(transaction).map( toTransactionField(transaction) )}
  </li>
}

const toTransactionField = transaction => field =>
  <p key={ `t-${ transaction.id }-${ field }`} >{ `${ field }: ${ transaction[field] }` }</p>
