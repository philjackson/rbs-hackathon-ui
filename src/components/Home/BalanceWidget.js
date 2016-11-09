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
      <div className="tabs balances">
        <ul>
          <li>
            <a>remaining: <span className="amount">£{numberWithCommas(balanceStore.balance)}</span></a>
          </li>
          <li>
            <a>out: <span className="amount">£{numberWithCommas(balanceStore.spent)}</span></a>
          </li>
          <li>
            <a>in: <span className="amount">£{numberWithCommas(balanceStore.paid)}</span></a>
          </li>

        </ul>
      </div>
      <UsageChart series={series} />
    </div>
  }
}

export default BalanceWidget
