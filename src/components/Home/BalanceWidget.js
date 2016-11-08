import React from 'react';
import {observer} from 'mobx-react';
import UsageChart from './UsageChart'

@observer
class BalanceWidget extends React.Component {

  handleClick(){
    console.log(arguments)
  }

  render(){
    const { balanceStore }   = this.props;


    const series = [{
      name: 'Spent',
      color: 'rgba(55,0,0,.5)',
      data: [balanceStore.spent]
    }, {
      name: 'Balance',
      data: [balanceStore.balance]
    }]

    return <div className="animated fadeInDown">
      <div className="tabs">
        <ul>
          <li>
            <a>Remains: £{balanceStore.balance}</a>
          </li>
          <li>
            <a>Out: £{balanceStore.spent}</a>
          </li>
          <li>
            <a>In: £{balanceStore.paid}</a>
          </li>

        </ul>
      </div>

      <div>
        <UsageChart
          series={series}
          onClick={::this.handleClick}
        />
      </div>

    </div>
  }
}

export default BalanceWidget
