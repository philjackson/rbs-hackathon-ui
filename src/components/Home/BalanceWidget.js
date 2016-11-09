import React        from 'react';
import { observer}  from 'mobx-react';
import UsageChart   from './UsageChart'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

@observer
class BalanceWidget extends React.Component {

  render(){
    const { balanceStore } = this.props;

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
      <div className="columns">
        <div className="column">
          <h1 className="subtitle">last 30 days</h1>

          <table>
            <tr>
              <td>balance:</td>
              <td className="balance-label">£{numberWithCommas(lastMonthBalance)}</td>

              <td>spent:</td>
              <td className="debit-label">£{numberWithCommas(lastMonthDebitBalance)}</td>

              <td>earned:</td>
              <td className="credit-label">£{numberWithCommas(lastMonthCreditBalance)}</td>
            </tr>
          </table>

          <UsageChart series={last_series} />
        </div>
        <div className="column">
          <h1 className="subtitle">next 30 days</h1>

          <table>
            <tr>
              <td>balance:</td>
              <td className="balance-label">£{numberWithCommas(nextMonthBalance)}</td>

              <td>spent:</td>
              <td className="debit-label">£{numberWithCommas(nextMonthDebitBalance)}</td>

              <td>earned:</td>
              <td className="credit-label">£{numberWithCommas(nextMonthCreditBalance)}</td>
            </tr>
          </table>

          <UsageChart series={next_series} />
        </div>
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
