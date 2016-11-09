import React from 'react'
import {observer} from 'mobx-react'
import numeral from 'numeral'
import moment from 'moment'
import classNames from 'classnames'

const money = (v, abs = false) => '£' + numeral(abs ? Math.abs(v) : v).format('0.00')

@observer
export default class Transactions extends React.Component {
  render(){
    const {lastMonth, nextMonth, accountBalance} = this.props.store
    return <div className="transactions-container">
      <h2 className="main-title">Next Month</h2>
      <h3 className="subtitle">To be spent: {money(nextMonth.reduce(toTotal, 0))}</h3>
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
        <tbody>
        { nextMonth.map(this.toTransaction, this) }
        </tbody>
      </table>
      <h2 className="main-title">Last Month</h2>
      <h3 className="subtitle">Already spent: {money(lastMonth.reduce(toTotal, 0))}</h3>
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
        <tbody>
        { lastMonth.map(this.toTransaction, this) }
        </tbody>
      </table>

    </div>

  }

  handleExpand(item){
    item.expanded = item.expanded ? false : true;
    this.forceUpdate()
  }

  toTransaction(t){
    const className = classNames({
      unfamiliar: t.unfamiliar,
      debit: t.transactionAmount < 0,
      credit: t.transactionAmount > 0,
      'info animated fadeInRight': t.expanded
    })

    if (t.expanded){
      return <tr className={className}>
        <td colSpan="4" className="description">
          New payee "{t.transactionDescription}"
        </td>
        <td className="cta">
          <button title="Dismiss" onClick={() => this.handleExpand(t)} className="button is-small">
            <i className="fa fa-times"/></button>
        </td>
      </tr>
    }

    return <tr key={ `t-${ t.id }` } className={className}>
      <td className="description" title={t.transactionDescription}>
        {t.transactionDescription}
      </td>
      <td className="date">
        <div className="is-hidden-mobile">
          {moment(t.transactionDateTime).format('DD/MM/YYYY')}
        </div>
        <div className="is-hidden-tablet">
          {moment(t.transactionDateTime).format('DD/MMM')}
        </div>
      </td>
      <td className="has-text-right transaction transaction-amount">
        {money(t.transactionAmount, true)}
      </td>
      <td className="has-text-right transaction">
        {money(t.accountBalance)}
      </td>
      <td className="cta">
        <button onClick={() => this.handleExpand(t)} className="button is-small"><i className="fa fa-eye"/></button>
      </td>
    </tr>
  }
}

function toTotal(total, t){
  return Math.abs(total + t.transactionAmount)
}
