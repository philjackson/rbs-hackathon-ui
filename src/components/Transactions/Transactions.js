import React from 'react'
import { observer } from 'mobx-react'
import numeral from 'numeral'
import moment from 'moment'

@observer
export default class Transactions extends React.Component {
  render () {
    const { last24h, next24h, accountBalance } = this.props.store
    return <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: 5 }}>Next 24 hours</h2>
      <p>To be spent: { next24h.reduce(toTotal, 0) }</p>
      <ul
        style={{ height: 200, overflow: 'scroll' }}>
        { next24h.map(toTransaction) }
      </ul>

      <h2 style={{ marginBottom: 5 }}>Last 24 hours</h2>
      <p>Already spent: { last24h.reduce(toTotal, 0) }</p>
      <ul
        style={{ height: 200, overflow: 'scroll', marginBottom: 10 }}>
        { last24h.map(toTransaction) }
      </ul>

    </div>

  }
}

function toTransaction(t) {
  return <li key={ `t-${ t.id }` } className="container" style={{ paddingBottom: 20 }}>
      <h3> { t.transactionDescription }</h3>
      { t.unfamiliar ? unfamiliar() : undefined }
      <p>{ moment(t.transactionDateTime).format('DD-MM-YYYY')}</p>
      <p>{ t.transactionAmount }</p>
      <p>{ t.accountBalance }</p>
  </li>
}

const toTransactionField = t => field =>
  <p key={ `t-${ t.id }-${ field }`} >{ `${ field }: ${ t[field] }` }</p>

function unfamiliar() {
  return <i className="fa fa-exclamation-triangle unfamiliar"/>
}

function toTotal(total, t) {
  return total + t.transactionAmount
}

