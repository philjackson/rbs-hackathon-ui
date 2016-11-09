import React        from 'react';
import { observer}  from 'mobx-react';
import UsageChart   from './UsageChart'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

@observer
class BalanceWidget extends React.Component {

  render(){
    const {
      // transactions
      lastMonthBalance
      , nextMonthBalance

      // balances
      , lastMonth
      , nextMonth

      // credit vs debit balances
      , lastMonthCreditBalance
      , lastMonthDebitBalance

      , nextMonthCreditBalance
      , nextMonthDebitBalance

    } = this.props.transactionsStore

    const last_series = [{
      name: 'Credit',
      color: '#FF8300',
      data: [lastMonthCreditBalance]
    }, {
      name: 'Debit',
      color: '#009FE3',
      data: [lastMonthDebitBalance]
    }]

    const next_series = [{
      name: 'Credit',
      color: '#FF8300',
      data: [nextMonthCreditBalance]
    }, {
      name: 'Debit',
      color: '#009FE3',
      data: [nextMonthDebitBalance]
    }]

    return (
      <div>
          <h2 className="main-title">last 30 days</h2>

          <table className="figures">
            <tr>
              <td>balance:<div className="balance-label">£{numberWithCommas(lastMonthBalance)}</div></td>
              <td>spent: <div className="debit-label">£{numberWithCommas(lastMonthDebitBalance)}</div></td>
              <td>earned: <div className="credit-label">£{numberWithCommas(lastMonthCreditBalance)}</div></td>
            </tr>
          </table>

          <UsageChart series={last_series} />

        <section>
          <h2 className="main-title">next 30 days</h2>

          <table className="figures">
            <tr>
              <td>balance:<div className="balance-label">£{numberWithCommas(nextMonthBalance)}</div></td>
              <td>spent: <div className="debit-label">£{numberWithCommas(nextMonthDebitBalance)}</div></td>
              <td>earned: <div className="credit-label">£{numberWithCommas(nextMonthCreditBalance)}</div></td>
            </tr>
          </table>

          <UsageChart series={next_series} />
        </section>
        </div>
    )
  }
}

export default BalanceWidget

/* <div className="balances">
 * <table>
 * <tr>
 * <td>
 * <div>remaining: <span className="amount balance-label">£{numberWithCommas(balanceStore.balance)}</span></div>
 * </td>
 * <td>
 * <div>out: <span className="amount spent-label">£{numberWithCommas(balanceStore.spent)}</span></div>
 * </td>
 * <td>
 * <div>in: <span className="amount">£{numberWithCommas(balanceStore.paid)}</span></div>
 * </td>
 * </tr>
 * </table>
 * </div>
 * <UsageChart series={series} />
 * </div>*/

/* <div>Next month balance: { nextMonthBalance }</div>
 * <div>Last month balance: { lastMonthBalance }</div>

 * <div>Last month credits balance: { nextMonthCreditBalance }</div>
 * <div>Last month debits balance: { nextMonthDebitBalance }</div>

 * <div>Next month credits balance: { nextMonthCreditBalance }</div>
 * <div>Next month debits balance: { nextMonthDebitBalance }</div>*/
