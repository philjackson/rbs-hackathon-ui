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

    const series = [{
      name: 'Spent',
      color: '#FF8300',
      data: [balanceStore.spent]
    }, {
      name: 'Balance',
      color: '#009FE3',
      data: [balanceStore.balance]
    }]

    return <div>

      <div>Next month balance: { nextMonthBalance }</div>
      <div>Last month balance: { lastMonthBalance }</div>

      <div>Last month credits balance: { lastMonthCreditBalance }</div>
      <div>Last month debits balance: { lastMonthDebitBalance }</div>

      <div>Next month credits balance: { nextMonthCreditBalance }</div>
      <div>Next month debits balance: { nextMonthDebitBalance }</div>

      <div className="tabs balances">
        <table>
          <tr>
            <td>
              <div>remaining: <span className="amount balance-label">£{numberWithCommas(balanceStore.balance)}</span></div>
            </td>
            <td>
              <div>out: <span className="amount spent-label">£{numberWithCommas(balanceStore.spent)}</span></div>
            </td>
            <td>
              <div>in: <span className="amount">£{numberWithCommas(balanceStore.paid)}</span></div>
            </td>
          </tr>
        </table>
      </div>
      <UsageChart series={series} />
    </div>
  }
}

export default BalanceWidget
