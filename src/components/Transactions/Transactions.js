import React from 'react'
import { observer } from 'mobx-react'
import numeral from 'numeral'
import moment from 'moment'
import classNames from 'classnames'

const money = (v) => '£' + numeral(Math.abs(v)).format('0.00')

@observer
export default class Transactions extends React.Component {
  render () {
    const { last24h, next24h, accountBalance } = this.props.store
    return <div className="">
      <div className="box">
        <h2 className="title">Next 24 hours</h2>
        <h3 className="subtitle">To be spent: {money(next24h.reduce(toTotal, 0))}</h3>
        <table className="table is-narrow">
          <thead>
            <tr>
              <th>
                Description
              </th>
              <th>
                Date
              </th>
              <th className="has-text-right">
                Amount
              </th>
              <th className="has-text-right">
                Balance
              </th>
              <th>

              </th>
            </tr>
          </thead>
          { next24h.map(toTransaction) }
        </table>
      </div>
      <div className="box">
        <h2 className="title">Last 24 hours</h2>
        <h3 className="subtitle">Already spent: {money(last24h.reduce(toTotal, 0))}</h3>

        <table className="table is-narrow">
          <thead>
          <tr>
            <th>
              Description
            </th>
            <th>
              Date
            </th>
            <th className="has-text-right">
              Amount
            </th>
            <th className="has-text-right">
              Balance
            </th>
            <th className="is-icon">

            </th>
          </tr>
          </thead>
          { last24h.map(toTransaction) }
        </table>

      </div>
    </div>

  }
}

function toTransaction(t){
  const className = classNames({
    unfamiliar: t.unfamiliar,
    debit: t.transactionAmount < 0,
    credit: t.transactionAmount > 0
  })

  return <tr key={ `t-${ t.id }` } className={className}>
    <td className="description" title={t.transactionDescription}>
      {t.transactionDescription}
    </td>
    <td className="date">
      <div className="is-hidden-mobile">
        {moment(t.transactionDateTime).format('DD/MM/YYYY')}
      </div>
      <div className="is-hidden-tablet">
        {moment(t.transactionDateTime).format('DD/MM')}
      </div>
    </td>
    <td className="has-text-right transaction transaction-amount">
      {money(t.transactionAmount)}
    </td>
    <td className="has-text-right transaction">
      {money(t.accountBalance)}
    </td>
    <td className="cta">
      <button className="button is-small"><i className="fa fa-eye"/></button>
    </td>
  </tr>
}

const toTransactionField = t => field =>
  <p key={ `t-${ t.id }-${ field }`} >{ `${ field }: ${ t[field] }` }</p>

function toTotal(total, t) {
  return Math.abs(total + t.transactionAmount)
}
